/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
}

export const Button = ({ label, ...props }: ButtonProps) => {
  const theme = useTheme();
  return (
    <button
      css={{
        backgroundColor: theme.colors.green,
        color: theme.colors.black,
        borderRadius: '5px',
        fontSize: '14px',
        padding: '8px',
      }}
      type="button"
      {...props}
    >
      {label}
    </button>
  );
};
