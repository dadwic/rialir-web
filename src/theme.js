'use client';

import { Vazirmatn } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const vazirmatn = Vazirmatn({
  weight: ['400', '700'],
  subsets: ['arabic'],
  variable: '--font-vazirmatn',
  display: 'swap',
});

export default createTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: '#CE0E2D',
    },
  },
  typography: {
    fontFamily: vazirmatn.style.fontFamily,
  },
  components: {
    MuiCssBaseline: {
      a: {
        color: '#90caf9',
        cursor: 'pointer',
        textDecoration: 'none',
        '&:hover': {
          color: '#64b5f6',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        wrapperVertical: {
          display: 'flex',
        },
      },
    },
  },
});
