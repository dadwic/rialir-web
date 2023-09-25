import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      کلیه حقوق این وب‌سایت محفوظ و متعلق به{' '}
      <Link color="inherit" href="https://www.rialir.com/" target="_blank">
        ریالیر
      </Link>{' '}
      می‌باشد.
    </Typography>
  );
}
