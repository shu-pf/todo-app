import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { defaultTheme } from '../themes/default';
import { Global } from '@emotion/react';
import { GlobalStyle } from '../styles/globals';
import * as NextImage from 'next/image';
import { SWRConfig } from 'swr';
import { initialize, mswDecorator } from 'msw-storybook-addon';

// MSWの初期化
initialize();

const OriginalNextImage = NextImage.default;
Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  // MSWアドオンデコレータをグローバルに提供する
  mswDecorator,
  (Story) => (
    <>
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, {
              headers: {
                'Content-Type': 'application/json',
              },
              ...init,
            }).then((res) => res.json()),
        }}
      >
        <Global styles={GlobalStyle} />
        <ThemeProvider theme={defaultTheme}>
          <Story />
        </ThemeProvider>
      </SWRConfig>
    </>
  ),
];
