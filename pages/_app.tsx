import { Global } from '@emotion/react';
import { ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

import { AuthProvider } from '../components/provider/AuthProvider';
import { GlobalStyle } from '../styles/globals';
import { defaultTheme } from '../themes/default';

type DefaultTheme = typeof defaultTheme;
declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Theme extends DefaultTheme {}
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
        <AuthProvider>
          <ThemeProvider theme={defaultTheme}>
            <Global styles={GlobalStyle} />
            <Component {...pageProps} />
          </ThemeProvider>
        </AuthProvider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
