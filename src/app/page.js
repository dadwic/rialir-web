'use client';

import React, { useContext, useEffect } from 'react';
import useSWR from 'swr';
import { AppDispatchContext } from '@/context';
import PricingForm from '@/components/Pricing/Form';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

const fetcher = (url) =>
  fetch(url, {
    cache: 'no-store',
  }).then((r) => r.json());

export default function Rates() {
  const { dispatch } = useContext(AppDispatchContext);
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

  useEffect(() => {
    if (data?.try_irt) {
      dispatch({ type: 'set_rates', data });
    }
  }, [data]);

  return <PricingForm updateRate={mutate} />;
}
