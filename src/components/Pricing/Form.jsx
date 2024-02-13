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
  const dispatch = useContext(AppDispatchContext);
  const { customer, pricing } = useContext(AppContext);
  const [editMode, setEditMode] = useState(true);
  const { control, handleSubmit, setValue, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { customer, ...pricing },
  });
  const { subtotal, discount, decimal } = watch();

  const onSubmit = ({ customer, ...form }) => {
    const subtotal = parseFloat(form.subtotal);
    const fee = parseInt(form.fee);
    const rate = parseInt(form.try) + fee;
    const dsc = fee * subtotal * 0.25;
    const discountVal = dsc > 50000 ? 50000 : dsc;
    // Convert toman to rial
    let invoiceTotal = rate * subtotal * 10;
    if (form.discount) invoiceTotal -= discountVal * 10;
    const data = { ...form, invoiceTotal, discountVal };
    dispatch({ type: 'set_pricing', customer, data });
    setEditMode(false);
  };

  useEffect(() => {
    fetch('https://www.rialir.com/wp-json/wp/v2/pricing')
      .then((res) => res.json())
      .then((data) => {
        setValue('try', data?.try);
        setValue('fee', data?.fee);
        setValue('date', data?.date);
      });
  }, []);

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
        sx={{ mt: 3 }}
        noValidate
      >
        <Grid container spacing={2}>
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
                    onClick={() => setValue('fee', '100')}
                  >
                    <MoneyIcon />
                  </IconButton>
                ),
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              control={control}
              type="tel"
              id="subtotal"
              name="subtotal"
              label="قیمت محصولات (₺)"
              InputProps={{
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
          <Grid item xs={6}>
            <Input
              type="tel"
              id="decimal"
              name="decimal"
              label="کروش (kr)"
              control={control}
              inputProps={{ maxLength: 5 }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    edge="end"
                    title="Set decimal"
                    disabled={!decimal}
                    onClick={() => {
                      setValue('subtotal', `${subtotal}.${decimal}`);
                      setValue('decimal', '');
                    }}
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
              name="description"
              id="description"
              label="توضیحات"
            />
          </Grid>
          <Grid item xs={12}>
            <Checkbox
              id="discount"
              name="discount"
              color="primary"
              control={control}
              defaultChecked={discount}
              label="تخفیف ۲۵٪ کارمزد خرید (حداکثر ۵۰ هزار تومان)"
            />
          </Grid>
        </Grid>
        <Button
          fullWidth
          type="submit"
          size="large"
          variant="contained"
          sx={{ my: 2 }}
        >
          محاسبه
        </Button>
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
