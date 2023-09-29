import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppProvider from './AppProvider';
import theme from './utils/theme';
import PricingForm from './components/Pricing/Form';
import ShippingForm from './components/Shipping/Form';
import RTL from './RTL';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const router = createBrowserRouter([
  {
    path: '/',
    element: <PricingForm />,
  },
  {
    path: '/shipping',
    element: <ShippingForm />,
  },
]);

root.render(
  <React.StrictMode>
    <AppProvider>
      <RTL>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={router} />
        </ThemeProvider>
      </RTL>
    </AppProvider>
  </React.StrictMode>
);
