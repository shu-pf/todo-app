/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
interface SpinnerProps {
  color?: string;
  className?: string;
}

export const Spinner = ({ color = '#FFFFFE', className }: SpinnerProps) => {
  return (
    <div
      className={className}
      css={css`
        display: inline-block;
        width: 80px;
        height: 80px;
        &:after {
          content: ' ';
          display: block;
          width: 64px;
          height: 64px;
          margin: 8px;
          border-radius: 50%;
          border: 6px solid ${color};
          border-color: ${color} transparent ${color} transparent;
          animation: lds-dual-ring 1.2s linear infinite;
        }
        @keyframes lds-dual-ring {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}
    ></div>
  );
};
