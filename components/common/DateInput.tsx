/** @jsxImportSource @emotion/react */
import { css, Theme } from '@emotion/react';
type Props = JSX.IntrinsicElements['input'];

export const DateInput = ({ ...props }: Props) => {
  return (
    <input
      type="date"
      {...props}
      css={(theme: Theme) =>
        css`
          display: block;
          width: 100%;
          border: 1px solid ${theme.colors.component.lighterLightGray};
          border-radius: 5px;
          height: 36px;
          padding-left: 12px;
          padding-right: 12px;
          color: ${theme.colors.text.navy};
        `
      }
    ></input>
  );
};
