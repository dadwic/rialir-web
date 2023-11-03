import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppProvider from './AppProvider';
import theme from './utils/theme';
import WaybillForm from './components/Waybill/Form';
import PricingForm from './components/Pricing/Form';
import ShippingForm from './components/Shipping/Form';
import AppContainer from './AppContainer';
import RTL from './RTL';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AppContainer>
        <PricingForm />
      </AppContainer>
    ),
  },
  {
    path: '/shipping',
    element: (
      <AppContainer>
        <ShippingForm />
      </AppContainer>
    ),
  },
  {
    path: '/waybill',
    element: <WaybillForm />,
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
