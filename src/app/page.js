'use client';

import React from 'react';
import useSWR from 'swr';
import PricingForm from '@/components/Pricing/Form';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

const fetcher = (url) =>
  fetch(url, {
    cache: 'no-store',
  }).then((r) => r.json());

export default function Rates() {
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
    return <CircularProgress />;
  }
  return <PricingForm />;
}