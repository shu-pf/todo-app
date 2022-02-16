/** @jsxImportSource @emotion/react */
import { css, Theme, useTheme } from '@emotion/react';
import { useMemo } from 'react';

type InputProps = JSX.IntrinsicElements['input'];
type Variant = 'default' | 'outlined';
type Props = InputProps & { variant?: Variant };

function style(theme: Theme) {
  const baseStyle = css`
    background-color: ${theme.colors.component.pureWhite};
    border-radius: 5px;
    padding: 12px;
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

export const TextInput = ({ type = 'text', variant = 'default', ...props }: Props) => {
  const theme = useTheme();
  const serializedStyles = useMemo(() => style(theme), [theme]);

  return <input type={type} css={serializedStyles[variant]} {...props} />;
};
