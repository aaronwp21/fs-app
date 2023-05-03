import '@/styles/globals.css';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import theme from '@/lib/theme';

export default function App({ Component, pageProps }) {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
