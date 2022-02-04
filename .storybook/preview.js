import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { defaultTheme } from '../themes/default';
import { Global } from '@emotion/react';
import { GlobalStyle } from '../styles/globals';

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
      <Global styles={GlobalStyle} />
      <ThemeProvider theme={defaultTheme}>
        <Story />
      </ThemeProvider>
    </>
  ),
];
