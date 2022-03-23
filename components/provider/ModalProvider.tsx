import { Theme, css } from '@emotion/react';
import { MouseEventHandler } from 'react';

interface ModalProviderProps {
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
  position?: 'center' | 'right';
}

const positionStyle = {
  center: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  right: css`
    display: flex;
    justify-content: flex-end;
  `,
};

/** @jsxImportSource @emotion/react */
export const ModalProvider = ({ position = 'center', children, onClick }: ModalProviderProps) => {
  return (
    <div
      css={(theme: Theme) => [
        css`
          z-index: ${theme.zIndex.modal};
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background-color: ${theme.colors.component.black41};
        `,
        positionStyle[position],
      ]}
      onClick={onClick}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};
