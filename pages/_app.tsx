import { GlobalStyle } from '../styles/globals';
import type { AppProps } from 'next/app';
import { Global } from '@emotion/react';
import { ThemeProvider } from '@emotion/react';
import { defaultTheme } from '../themes/default';
type DefaultTheme = typeof defaultTheme;
declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Theme extends DefaultTheme {}
}

import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
        <Global styles={GlobalStyle} />
        <ThemeProvider theme={defaultTheme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
