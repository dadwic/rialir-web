import React from 'react';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import ManIcon from '@mui/icons-material/Man';
import Input from './Input';

export default function CustomerFields({ control, setValue }) {
  return (
    <>
      <Grid item xs={6}>
        <Input
          control={control}
          name="customer.firstName"
          id="firstName"
          label="نام"
          InputProps={{
            endAdornment: (
              <IconButton
                edge="end"
                onClick={() => setValue('customer.firstName', 'آقای ')}
              >
                <ManIcon />
              </IconButton>
            ),
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <Input
          control={control}
          name="customer.lastName"
          id="lastName"
          label="نام خانوادگی"
        />
      </Grid>
      <Grid item xs={6}>
        <Input
          control={control}
          type="tel"
          id="mobile"
          name="customer.mobile"
          inputProps={{ maxLength: 11 }}
          label="شماره موبایل"
        />
      </Grid>
      <Grid item xs={6}>
        <Input
          control={control}
          name="customer.address"
          id="address"
          label="آدرس"
        />
      </Grid>
    </>
  );
}
