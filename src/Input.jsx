import React from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';

export default function Input({ control, name, ...props }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, formState: { errors } }) => (
        <TextField
          {...field}
          helperText={errors[name]?.message}
          error={Boolean(errors[name]?.message)}
          {...props}
        />
      )}
    />
  );
}
