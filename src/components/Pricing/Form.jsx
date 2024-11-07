import React, { useContext, useEffect, useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoneyIcon from '@mui/icons-material/Money';
import CloseIcon from '@mui/icons-material/Close';
import PricingIcon from '@mui/icons-material/CurrencyLira';
import { AppContext, AppDispatchContext } from '../../context';
import CustomerFields from '../Form/CustomerFields';
import NumericFormat from '../Form/NumericFormat';
import Checkbox from '../Form/Checkbox';
import Input from '../Form/Input';
import Copyright from '../Copyright';
import Invoice from './Invoice';

const schema = yup
  .object({
    customer: yup.object().shape({
      firstName: yup.string().required('نام الزامی است.'),
      lastName: yup.string().required('نام خانوادگی الزامی است.'),
      mobile: yup.string().required('شماره موبایل الزامی است.'),
      address: yup.string().required('آدرس الزامی است.'),
    }),
    try: yup.string().required('قیمت لیر الزامی است.'),
    fee: yup.string().required('کارمزد الزامی است.'),
    subtotal: yup.string().required('قیمت محصولات الزامی است.'),
  })
  .required();

export default function PricingForm() {
  const { dispatch, resetApp } = useContext(AppDispatchContext);
  const { customer, pricing } = useContext(AppContext);
  const [editMode, setEditMode] = useState(true);
  const { control, handleSubmit, setValue, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { customer, ...pricing },
  });
  const { discount, firstOrder } = watch();

  const onSubmit = ({ customer, ...form }) => {
    const subtotal = parseFloat(form.subtotal);
    const fee = parseInt(form.fee);
    const lir = parseInt(form.try);
    // Convert toman to rial
    let rate = lir + fee;
    let total = subtotal * rate;
    if (form.discount) total -= form.discountVal;
    if (firstOrder) {
      rate = lir + 50;
      // Max discount is 250K-IRT
      if (subtotal > 1000) total -= 250000;
      else total = subtotal * rate;
    }
    const data = { ...form, invoiceTotal: total * 10 };
    dispatch({ type: 'set_pricing', customer, data });
    setEditMode(false);
  };

  const handleReset = () => {
    if (confirm('همه اطلاعات پاک خواهد شد، تایید می‌کنید؟')) {
      resetApp();
      window.location.reload();
    }
  };

  if (!editMode) return <Invoice onEdit={() => setEditMode(true)} />;

  return (
    <Box
      sx={{
        marginTop: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
        <PricingIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        محاسبه گر قیمت نهایی کالا
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 2 }}
        noValidate
      >
        <Grid container spacing={2} my={2}>
          <CustomerFields control={control} setValue={setValue} />
          <Grid item xs={6}>
            <Input
              control={control}
              type="tel"
              id="try"
              name="try"
              label="قیمت لیر (تومان)"
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              control={control}
              type="tel"
              id="fee"
              name="fee"
              label="کارمزد (تومان)"
              InputProps={{
                endAdornment: (
                  <IconButton
                    edge="end"
                    title="همکار"
                    onClick={() => setValue('fee', '200')}
                  >
                    <MoneyIcon />
                  </IconButton>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              control={control}
              type="tel"
              id="subtotal"
              name="subtotal"
              label="قیمت محصولات (₺)"
              InputProps={{
                inputComponent: NumericFormat,
                endAdornment: (
                  <IconButton
                    edge="end"
                    title="پاک کردن"
                    onClick={() => setValue('subtotal', '')}
                  >
                    <CloseIcon />
                  </IconButton>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              control={control}
              name="description"
              id="description"
              label="توضیحات"
            />
          </Grid>
          <Grid item xs={3}>
            <Checkbox
              id="discount"
              name="discount"
              color="primary"
              control={control}
              defaultChecked={discount}
              label="تخفیف"
            />
          </Grid>
          <Grid item xs={9}>
            <Input
              control={control}
              type="tel"
              id="discountVal"
              name="discountVal"
              label="تخفیف (تومان)"
              disabled={!discount}
            />
          </Grid>
          <Grid item xs={12}>
            <Checkbox
              id="firstOrder"
              name="firstOrder"
              color="primary"
              control={control}
              defaultChecked={firstOrder}
              label="سفارش اول بدون کارمزد (تا سقف ۱۰۰۰ لیر)"
            />
          </Grid>
          <Grid item xs={9}>
            <Button fullWidth type="submit" size="large" variant="contained">
              محاسبه
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              fullWidth
              size="large"
              variant="outlined"
              onClick={handleReset}
            >
              RESET
            </Button>
          </Grid>
        </Grid>
        <Button
          fullWidth
          LinkComponent={Link}
          variant="outlined"
          size="large"
          to="/shipping"
        >
          محاسبه گر هزینه باربری
        </Button>
        <Button
          fullWidth
          LinkComponent={Link}
          variant="outlined"
          size="large"
          to="/waybill"
          sx={{ my: 2 }}
        >
          صدور بارنامه
        </Button>
        <Button
          fullWidth
          size="large"
          variant="outlined"
          href="https://www.rialir.com/lir/"
        >
          قیمت لحظه ای لیر
        </Button>
      </Box>
      <Copyright />
    </Box>
  );
}
