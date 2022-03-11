import { css, Theme } from '@emotion/react';
import 'ress';

export const GlobalStyle = (theme: Theme) => css`
  a {
    color: inherit;
    text-decoration: none;
  }
  *,
  *::before,
  *::after {
    font-family: 'Raleway', 'Sawarabi Gothic', sans-serif;
    letter-spacing: 0.05em;
    color: ${theme.colors.text.navy};
  }
  li {
    list-style: none;
  }
`;
