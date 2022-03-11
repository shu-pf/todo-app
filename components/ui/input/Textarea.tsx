/** @jsxImportSource @emotion/react */
import { css, Theme } from '@emotion/react';
interface Props {
  width?: string;
  height?: string;
  value?: JSX.IntrinsicElements['textarea']['value'];
  onChange?: JSX.IntrinsicElements['textarea']['onChange'];
}

export const Textarea = ({ width = '100%', height = '128px', ...textareaProps }: Props) => {
  return (
    <textarea
      css={(theme: Theme) =>
        css`
          border: 1px solid ${theme.colors.component.lighterLightGray};
          border-radius: 5px;
          width: ${width};
          height: ${height};
          padding: 8px 10px;
        `
      }
      {...textareaProps}
    ></textarea>
  );
};
