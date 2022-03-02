/** @jsxImportSource @emotion/react */
import { css, Theme } from '@emotion/react';

type Props = JSX.IntrinsicElements['textarea'] & {
  width?: string;
  height?: string;
};

export const Textarea = ({ width = '100%', height = '128px', ...props }: Props) => {
  return (
    <textarea
      {...props}
      css={(theme: Theme) =>
        css`
          border: 1px solid ${theme.colors.component.lighterLightGray};
          border-radius: 5px;
          width: ${width};
          height: ${height};
          padding: 8px 10px;
        `
      }
    ></textarea>
  );
};
