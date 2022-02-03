import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Global, css } from '@emotion/react';
import restCss from 'ress';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global
        styles={css(`
          ${restCss}
          body {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
        `)}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
