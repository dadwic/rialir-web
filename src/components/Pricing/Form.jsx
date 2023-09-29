import React, { useContext, useEffect, useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OneKIcon from '@mui/icons-material/OneK';
import PricingIcon from '@mui/icons-material/CurrencyLira';
import { AppContext, AppDispatchContext } from '../../context';
import Copyright from '../../Copyright';
import Input from '../../Input';
import Invoice from './Invoice';

const schema = yup
  .object({
    firstName: yup.string().required('نام الزامی است.'),
    lastName: yup.string().required('نام خانوادگی الزامی است.'),
    mobile: yup.string().required('شماره موبایل الزامی است.'),
    address: yup.string().required('آدرس الزامی است.'),
    try: yup.string().required('قیمت لیر الزامی است.'),
    fee: yup.string().required('کارمزد الزامی است.'),
    shipping: yup.string().required('هزینه باربری الزامی است.'),
  })
  .required();

export default function PricingForm() {
  const store = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);
  const [editMode, setEditMode] = useState(true);
  const { control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: store.pricing,
  });

  const onSubmit = (data) => {
    dispatch({ type: 'set_pricing', data });
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
    <Container component="main" maxWidth="xs">
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
            <Grid item xs={6}>
              <Input
                fullWidth
                autoFocus
                control={control}
                name="firstName"
                id="firstName"
                label="نام"
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                fullWidth
                control={control}
                id="lastName"
                name="lastName"
                label="نام خانوادگی"
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                fullWidth
                control={control}
                type="tel"
                id="mobile"
                name="mobile"
                inputProps={{ maxLength: 11 }}
                label="شماره موبایل"
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                fullWidth
                control={control}
                id="address"
                name="address"
                label="آدرس"
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                fullWidth
                control={control}
                type="tel"
                id="try"
                name="try"
                label="قیمت لیر (تومان)"
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                fullWidth
                control={control}
                type="tel"
                id="fee"
                name="fee"
                label="کارمزد"
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                fullWidth
                control={control}
                type="tel"
                id="shipping"
                name="shipping"
                label="هزینه باربری (تومان)"
                InputProps={{
                  endAdornment: (
                    <IconButton
                      edge="end"
                      onClick={() => setValue('shipping', '250000')}
                    >
                      <OneKIcon />
                    </IconButton>
                  ),
                }}
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
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
