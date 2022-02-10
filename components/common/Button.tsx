/** @jsxImportSource @emotion/react */
import { css, SerializedStyles, Theme, useTheme } from '@emotion/react';
import { useEffect, useState } from 'react';
import Add from './icons/add.svg';
interface ButtonProps {
  label: string;
  variant?: 'primary' | 'error' | 'outlined' | 'underlined';
  shadow?: boolean;
  disabled?: boolean;
  icon?: boolean;
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
    primary: {
      btn: [
        css`
          background-color: ${theme.colors.primary.green};
          color: ${theme.colors.text.navy};
        `,
      ],
      icon: css`
        path {
          fill: ${theme.colors.text.navy};
        }
      `,
    },
    error: {
      btn: [
        css`
          background-color: ${theme.colors.primary.pink};
          color: ${theme.colors.text.white};
        `,
      ],
      icon: css`
        path {
          fill: ${theme.colors.text.white};
        }
      `,
    },
    outlined: {
      btn: [
        css`
          border: 1px solid ${theme.colors.component.gray};
          color: ${theme.colors.text.gray};
        `,
      ],
      icon: css`
        path {
          fill: ${theme.colors.text.gray};
        }
      `,
    },
    underlined: {
      btn: [
        css`
          text-decoration: underline;
          color: ${theme.colors.component.pureWhite};
        `,
      ],
      icon: css`
        path {
          fill: ${theme.colors.component.pureWhite};
        }
      `,
    },
  };
}

const btnShadowStyle = (theme: Theme) => css`
  box-shadow: 0px 0px 13px ${theme.colors.component.shadowBlack};
`;

const disabledBtnStyles = (theme: Theme) => {
  return {
    btn: [
      css`
        color: ${theme.colors.component.gray};
        background: ${theme.colors.component.lighterLightGray};
        cursor: default;
      `,
    ],
    icon: css`
      path {
        fill: ${theme.colors.component.gray};
      }
    `,
  };
};

export const Button = ({
  label,
  shadow,
  variant = 'primary',
  disabled,
  icon = false,
  ...props
}: ButtonProps) => {
  const theme = useTheme();

  const [buttonStyles, setButtonStyles] =
    useState<{ btn: SerializedStyles[]; icon: SerializedStyles }>();

  useEffect(() => {
    if (disabled) {
      setButtonStyles(disabledBtnStyles(theme));
      return;
    }

    const styles = btnStyles(theme)[variant];

    if (shadow) {
      styles.btn.push(btnShadowStyle(theme));
    }

    setButtonStyles(styles);
  }, [shadow, theme, variant, disabled]);

  return (
    <button css={[buttonStyles?.btn, baseBtnStyle]} type="button" disabled {...props}>
      {icon && (
        <Add
          css={[
            buttonStyles?.icon,
            css`
              margin-right: 4px;
            `,
          ]}
        />
      )}
      {label}
    </button>
  );
};
