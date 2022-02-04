import { GlobalStyle } from '../styles/globals';
import type { AppProps } from 'next/app';
import { Global } from '@emotion/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={GlobalStyle} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
