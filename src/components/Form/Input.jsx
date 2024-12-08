import React from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { fa2en } from '@/utils';

export default function Input({ control, name, ...props }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          onKeyUp={fa2en}
          error={Boolean(error)}
          helperText={error?.message}
          {...props}
        />
      )}
    />
  );
}
