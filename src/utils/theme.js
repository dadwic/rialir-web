import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'Vazirmatn',
  },
  palette: {
    primary: {
      main: '#CE0E2D',
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiDivider: {
      styleOverrides: {
        wrapperVertical: {
          display: 'flex',
        },
      },
    },
  },
});

export default theme;
