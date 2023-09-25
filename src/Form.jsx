import React, { useContext } from 'react';
import * as yup from 'yup';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
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
import Input from './Input';

const schema = yup
  .object({
    firstName: yup.string().required('نام الزامی است.'),
    lastName: yup.string().required('نام خانوادگی الزامی است.'),
    mobile: yup.string().required('شماره موبایل الزامی است.'),
    products: yup.array().of(
      yup.object().shape({
        name: yup.string().required('نام الزامی است.'),
        weight: yup.string().required('وزن الزامی است.'),
      })
    ),
  })
  .required();

export default function Form() {
  const dispatch = useContext(AppDispatchContext);
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: 'Mehrdad',
      products: [{ name: 'test', weight: '1000' }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'products',
  });

  const onSubmit = (data) => dispatch({ type: 'set_data', data });

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
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
            <Grid item xs={12} sm={6}>
              <Input
                fullWidth
                autoFocus
                control={control}
                name="firstName"
                id="firstName"
                label="نام"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                fullWidth
                control={control}
                id="lastName"
                name="lastName"
                label="نام خانوادگی"
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                fullWidth
                control={control}
                id="mobile"
                name="mobile"
                label="شماره موبایل"
              />
            </Grid>
            {fields.map((field, index) => (
              <>
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
                    type="number"
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
              </>
            ))}
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="تیپاکس"
              />
            </Grid>
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
