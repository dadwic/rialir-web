import React, { useContext } from 'react';
import * as yup from 'yup';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import ShippingIcon from '@mui/icons-material/LocalShipping';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { AppDispatchContext } from './context';
import Copyright from './Copyright';
import Checkbox from './Checkbox';
import Input from './Input';

const schema = yup
  .object({
    firstName: yup.string().required('نام الزامی است.'),
    lastName: yup.string().required('نام خانوادگی الزامی است.'),
    mobile: yup.string().required('شماره موبایل الزامی است.'),
    address: yup.string().required('آدرس الزامی است.'),
    products: yup.array().of(
      yup.object().shape({
        name: yup.string().required('نام الزامی است.'),
        weight: yup.string().required('وزن الزامی است.'),
      })
    ),
  })
  .required();

export default function Form({ store }) {
  const dispatch = useContext(AppDispatchContext);
  const { control, handleSubmit, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: store,
  });
  const { tipax } = watch();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'products',
  });

  const onSubmit = (data) => {
    dispatch({ type: 'set_data', data });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <ShippingIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          محاسبه گر هزینه باربری
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
            {fields.map((field, index) => (
              <React.Fragment key={index}>
                <Grid item xs={6}>
                  <Input
                    fullWidth
                    key={field.id}
                    id={field.id}
                    control={control}
                    name={`products.${index}.name`}
                    label="نام محصول"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Input
                    fullWidth
                    key={field.id}
                    id={field.id}
                    control={control}
                    name={`products.${index}.weight`}
                    label="وزن محصول (گرم)"
                    type="tel"
                  />
                  <Button
                    startIcon={<AddIcon />}
                    variant="outlined"
                    sx={{ mt: 1 }}
                    onClick={() => append({ name: '', weight: '' })}
                  >
                    محصول جدید
                  </Button>
                  <IconButton
                    color="error"
                    sx={{ mt: 1, ml: 1 }}
                    disabled={index === 0}
                    onClick={() => remove(index)}
                  >
                    <CloseIcon />
                  </IconButton>
                </Grid>
              </React.Fragment>
            ))}
            <Grid item xs={6}>
              <Checkbox
                id="tipax"
                name="tipax"
                color="primary"
                control={control}
                defaultChecked={tipax}
                label="تیپاکس"
              />
            </Grid>
            {!tipax && (
              <Grid item xs={6}>
                <Input
                  fullWidth
                  control={control}
                  type="tel"
                  id="cargo"
                  name="cargo"
                  label="هزینه پیک (تومان)"
                />
              </Grid>
            )}
          </Grid>
          <Button
            fullWidth
            type="submit"
            size="large"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            محاسبه
          </Button>
          <Grid container justifyContent="flex-start">
            <Grid item>
              <Link
                href="https://www.rialir.com/lir/"
                variant="body2"
                target="_blank"
              >
                محاسبه گر قیمت نهایی کالا
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
