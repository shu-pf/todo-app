import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      brand: {
        pink: string;
      };
      primary: {
        pink: string;
        green: string;
      };
      secondary: {
        white: string;
      };
      text: {
        navy: string;
        gray: string;
        pink: string;
        blue: string;
        white: string;
        white55: string;
      };
      component: {
        lightGray: string;
        sliverWhite: string;
        yellow: string;
        black40: string;
        black55: string;
        navy40: string;
        pink70: string;
        red30: string;
        pureWhite: string;
        shadowBlack: string;
        lighterLightGray: string;
      };
    };
  }
}
