/** @jsxImportSource @emotion/react */
import { css, Theme } from '@emotion/react';

interface Props {
  value: JSX.IntrinsicElements['input']['value'];
  onChange: JSX.IntrinsicElements['input']['onChange'];
}

export const DateInput = ({ ...inputProps }: Props) => {
  return (
    <input
      type="date"
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
      {...inputProps}
    ></input>
  );
};
