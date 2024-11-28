import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Copyright(props) {
  return (
    <Typography
      variant="body1"
      color="text.secondary"
      align="center"
      my={5}
      {...props}
    >
      v{process.env.APP_VERSION}
    </Typography>
  );
}
