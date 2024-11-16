import React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppContainer from '@/components/AppContainer';
import AppProvider from '@/components/AppProvider';
import Rtl from '@/components/Rtl';
import theme from '@/theme';

export default function RootLayout(props) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>rialir | ریالیر</title>
        <meta name="description" content="Calculate Shipping App" />
        <link
          rel="icon"
          href="/favicon.ico"
          type="image/x-icon"
          sizes="256x256"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
          sizes="180x180"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon-152x152.png"
          sizes="152x152"
        />
        <link rel="mask-icon" href="/mask-icon.svg" color="#FFFFFF" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="robots" content="noindex" />
        <meta name="google" value="notranslate" />
      </head>
      <body>
        <AppProvider>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <Rtl>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppContainer>{props.children}</AppContainer>
              </ThemeProvider>
            </Rtl>
          </AppRouterCacheProvider>
        </AppProvider>
      </body>
    </html>
  );
}
