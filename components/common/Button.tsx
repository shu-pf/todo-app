/** @jsxImportSource @emotion/react */
import { css, Theme } from '@emotion/react';
import { MouseEventHandler } from 'react';
import Add from './icons/add.svg';
interface ButtonProps {
  label: string;
  variant?: 'primary' | 'error' | 'outlined' | 'underlined';
  shadow?: boolean;
  disabled?: boolean;
  icon?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const btnBaseStyle = css`
  padding: 10px;
  border-radius: 5px;
  transition: 0.2s;
  :hover {
    opacity: 0.8;
  }
`;

const iconBaseStyle = css`
  margin-right: 4px;
`;

const btnShadowStyle = (theme: Theme) => css`
  box-shadow: 0px 0px 13px ${theme.colors.component.shadowBlack};
`;

const disabledBtnStyle = (theme: Theme) => {
  return css`
    color: ${theme.colors.component.gray};
    background: ${theme.colors.component.lighterLightGray};
    cursor: default;
  `;
};

const disabledIconStyle = (theme: Theme) => {
  return css`
    path {
      fill: ${theme.colors.component.gray};
    }
  `;
};

function btnVariantStyles(theme: Theme) {
  return {
    primary: css`
      background-color: ${theme.colors.primary.green};
      color: ${theme.colors.text.navy};
    `,
    error: css`
      background-color: ${theme.colors.primary.pink};
      color: ${theme.colors.text.white};
    `,
    outlined: css`
      border: 1px solid ${theme.colors.component.gray};
      color: ${theme.colors.text.gray};
    `,
    underlined: css`
      text-decoration: underline;
      color: ${theme.colors.component.pureWhite};
    `,
  };
}

const iconVariantStyles = (theme: Theme) => {
  return {
    primary: css`
      path {
        fill: ${theme.colors.text.navy};
      }
    `,
    error: css`
      path {
        fill: ${theme.colors.text.white};
      }
    `,
    outlined: css`
      path {
        fill: ${theme.colors.text.gray};
      }
    `,
    underlined: css`
      path {
        fill: ${theme.colors.component.pureWhite};
      }
    `,
  };
};

export const Button = ({
  label,
  shadow = false,
  variant = 'primary',
  icon = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      css={(theme: Theme) => [
        btnBaseStyle,
        btnVariantStyles(theme)[variant],
        shadow && btnShadowStyle(theme),
        props.disabled && disabledBtnStyle(theme),
      ]}
      type="button"
      {...props}
    >
      {icon && (
        <Add
          css={(theme: Theme) => [
            iconBaseStyle,
            iconVariantStyles(theme)[variant],
            props.disabled && disabledIconStyle(theme),
          ]}
        />
      )}
      {label}
    </button>
  );
};
