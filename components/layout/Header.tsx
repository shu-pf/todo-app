import { css, Theme } from '@emotion/react';

/** @jsxImportSource @emotion/react */
interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  return (
    <div
      css={(theme: Theme) =>
        css`
          display: flex;
          border-bottom: 1px solid ${theme.colors.component.lightGray};
          height: 96px;
          align-items: center;
        `
      }
    >
      <h1
        css={css`
          margin-left: 20px;
          font-size: 24px;
        `}
      >
        {title}
      </h1>
    </div>
  );
};
