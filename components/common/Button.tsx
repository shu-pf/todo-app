/** @jsxImportSource @emotion/react */
import { css, SerializedStyles, Theme, useTheme } from '@emotion/react';
import { useEffect, useState } from 'react';

interface ButtonProps {
  label: string;
  variant?: 'primary' | 'error' | 'outlined' | 'underlined';
  shadow?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const baseBtnStyle = css`
  padding: 10px;
  border-radius: 5px;
  transition: 0.2s;
  :hover {
    opacity: 0.8;
  }
`;

function btnStyles(theme: Theme) {
  return {
    primary: [
      baseBtnStyle,
      css`
        background-color: ${theme.colors.primary.green};
        color: ${theme.colors.text.navy};
      `,
    ],
    error: [
      baseBtnStyle,
      css`
        background-color: ${theme.colors.primary.pink};
        color: ${theme.colors.text.white};
      `,
    ],
    outlined: [
      baseBtnStyle,
      css`
        border: 1px solid ${theme.colors.component.gray};
        color: ${theme.colors.text.gray};
      `,
    ],
    underlined: [
      baseBtnStyle,
      css`
        text-decoration: underline;
        color: ${theme.colors.component.pureWhite};
      `,
    ],
  };
}

const btnShadowStyle = (theme: Theme) => css`
  box-shadow: 0px 0px 13px ${theme.colors.component.shadowBlack};
`;

const disabledBtnStyles = (theme: Theme) => [
  baseBtnStyle,
  css`
    color: ${theme.colors.component.gray};
    background: ${theme.colors.component.lighterLightGray};
  `,
];

export const Button = ({ label, shadow, variant = 'primary', ...props }: ButtonProps) => {
  const theme = useTheme();

  const [buttonStyles, setButtonStyles] = useState<SerializedStyles[]>();

  useEffect(() => {
    if (props.disabled) {
      setButtonStyles(disabledBtnStyles(theme));
      return;
    }

    const styles = btnStyles(theme)[variant];

    if (shadow) {
      styles.push(btnShadowStyle(theme));
    }

    setButtonStyles(styles);
  }, [shadow, theme, variant, props.disabled]);

  return (
    <button css={buttonStyles} type="button" {...props}>
      {label}
    </button>
  );
};
