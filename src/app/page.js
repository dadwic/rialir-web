'use client';

import React from 'react';
import useSWR from 'swr';
import PricingForm from '@/components/Pricing/Form';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

const fetcher = (url) =>
  fetch(url, {
    cache: 'no-store',
  }).then((r) => r.json());

export default function Pricing() {
  const { data, error, isLoading, mutate } = useSWR('/api/rates', fetcher);

  if (error) {
    return (
      <Alert
        severity="error"
        action={
          <Button color="inherit" size="small" onClick={mutate}>
            تلاش دوباره
          </Button>
        }
      >
        خطا در به‌روزرسانی قیمت لیر
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <Stack minHeight="100vh" alignItems="center" justifyContent="center">
        <CircularProgress />
      </Stack>
    );
  }

  return <PricingForm rates={data} updateRate={mutate} />;
}
