/** @jsxImportSource @emotion/react */
import { css, Theme, useTheme } from '@emotion/react';
import { FormEventHandler, useMemo } from 'react';

interface Props {
  type: Extract<JSX.IntrinsicElements['input']['type'], 'text' | 'email' | 'password'>;
  placeholder?: JSX.IntrinsicElements['input']['placeholder'];
  required?: JSX.IntrinsicElements['input']['required'];
  value?: JSX.IntrinsicElements['input']['value'];
  onChange?: FormEventHandler<HTMLInputElement>;
  variant?: 'default' | 'outlined';
  size?: 'large' | 'small';
  className?: string;
}

const sizeStyles = {
  large: css`
    padding: 12px;
  `,
  small: css`
    height: 36px;
    padding: 7px 12px;
  `,
};

function style(theme: Theme) {
  const baseStyle = css`
    background-color: ${theme.colors.component.pureWhite};
    border-radius: 5px;
  `;

  return {
    default: [
      baseStyle,
      css`
        box-shadow: 0px 0px 13px ${theme.colors.component.shadowBlack};
      `,
    ],
    outlined: [
      baseStyle,
      css`
        border: 1px solid ${theme.colors.component.lighterLightGray};
      `,
    ],
  };
}

export const TextInput = ({
  type = 'text',
  size = 'large',
  variant = 'default',
  className,
  ...inputProps
}: Props) => {
  const theme = useTheme();
  const serializedStyles = useMemo(() => style(theme), [theme]);

  return (
    <input
      className={className}
      type={type}
      css={[serializedStyles[variant], sizeStyles[size]]}
      {...inputProps}
    />
  );
};
