/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
type InputProps = JSX.IntrinsicElements['input'];
type Variant = 'default' | 'outlined';
type Props = InputProps & { labelText: string; variant: Variant };

export const Input = ({ labelText = '', variant = 'default', ...props }: Props) => {
  const theme = useTheme();

  const baseStyle = {
    label: css`
      display: block;
      letter-spacing: 0.05em;
      color: ${theme.colors.text.navy};
    `,
    input: css`
      background-color: #fff;
      border-radius: 5px;
      padding: 12px;
    `,
  };

  const style = {
    default: {
      label: baseStyle.label,
      input: [
        baseStyle.input,
        css`
          box-shadow: 0px 0px 13px rgba(0, 0, 0, 0.25);
        `,
      ],
    },
    outlined: {
      label: baseStyle.label,
      input: [
        baseStyle.input,
        css`
          border: 1px solid #dadada;
        `,
      ],
    },
  };

  return (
    <>
      {labelText && <label css={style[variant].label}>{labelText}</label>}
      <input {...props} css={style[variant].input} />
    </>
  );
};
