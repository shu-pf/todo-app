import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { defaultTheme } from '../themes/default';
import { Global } from '@emotion/react';
import { GlobalStyle } from '../styles/globals';
import * as NextImage from 'next/image';
import { RecoilRoot } from 'recoil';

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
  (Story) => (
    <>
      <RecoilRoot>
        <Global styles={GlobalStyle} />
        <ThemeProvider theme={defaultTheme}>
          <Story />
        </ThemeProvider>
      </RecoilRoot>
    </>
  ),
];
