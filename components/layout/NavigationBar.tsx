/** @jsxImportSource @emotion/react */
import { css, Theme } from '@emotion/react';
import Image from 'next/image';
import { MouseEventHandler } from 'react';
import { Icon } from '../common/Icon';
import { List } from './NavigationBar/List';

interface category {
  id: string;
  name: string;
}

interface NavigationBarProps {
  currentCategoryId?: string;
  onSelect: ({ categoryId }: { categoryId: string }) => void;
  onLogout: () => MouseEventHandler<HTMLButtonElement>;
  onAddCategory: () => MouseEventHandler<HTMLButtonElement>;
  categories?: category[];
}

const headingStyle = (theme: Theme) => css`
  display: inline-block;
  position: relative;
  font-size: 12px;
  color: ${theme.colors.secondary.white};
  margin-bottom: 19px;
  padding-right: 5px;
  padding-bottom: 4px;
  ::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    top: calc(100% - 2px);
    left: 0;
    background-color: ${theme.colors.secondary.white};
    border-radius: 2px;
  }
  ::after {
    content: '';
    position: absolute;
    height: 40%;
    width: 2px;
    top: 60%;
    right: 0;
    background-color: ${theme.colors.secondary.white};
    border-radius: 2px;
  }
`;

export const NavigationBar = ({
  currentCategoryId,
  categories,
  onSelect,
  onLogout,
  onAddCategory,
}: NavigationBarProps) => {
  return (
    <nav
      css={(theme: Theme) => css`
        display: flex;
        flex-direction: column;
        width: 259px;
        height: 100vh;
        padding: 30px;
        background-color: ${theme.colors.primary.pink};
        position: relative;
        overflow: hidden;
        z-index: 0;
      `}
    >
      <div
        css={css`
          position: absolute;
          top: 55%;
          left: 0;
          height: 44%;
          z-index: -1;
        `}
      >
        <Image src="/images/layout/background.svg" width="75" height="273" alt="" />
      </div>
      <div
        css={css`
          flex-basis: 15%;
          max-height: 90px;
          flex-shrink: 0;
        `}
      >
        <Image src="/images/logo.svg" height="33" width="33" alt="logo" />
      </div>
      <div>
        <ul
          css={css`
            margin-bottom: 32px;
          `}
        >
          <List
            name="All"
            onClick={() => {
              onSelect({ categoryId: '' });
            }}
            active={!Boolean(currentCategoryId)}
          />
        </ul>
      </div>
      <div>
        <h1 css={headingStyle}>Categories</h1>
      </div>
      <div
        css={css`
          overflow: auto;
        `}
      >
        {categories && (
          <ul
            css={css`
              li {
                margin-bottom: 16px;
              }
            `}
          >
            {categories.map((category) => (
              <List
                key={category.id}
                name={category.name}
                active={category.id === currentCategoryId}
                onClick={() => {
                  onSelect({ categoryId: category.id });
                }}
              />
            ))}
          </ul>
        )}
      </div>
      <div
        css={css`
          flex-grow: 1;
          margin-top: 12px;
        `}
      >
        <button
          onClick={onAddCategory}
          css={(theme: Theme) => css`
            background-color: ${theme.colors.component.red30};
            padding: 9px;
            color: ${theme.colors.text.white};
            width: 100%;
            border-radius: 5px;
            display: flex;
          `}
        >
          <Icon name="Create" />
          <span
            css={css`
              margin-left: 20px;
            `}
          >
            Add Category
          </span>
        </button>
      </div>
      <div
        css={css`
          margin-top: 12px;
        `}
      >
        <button onClick={onLogout}>
          <Icon name="Logout" />
        </button>
      </div>
    </nav>
  );
};
