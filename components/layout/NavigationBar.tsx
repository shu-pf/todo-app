/** @jsxImportSource @emotion/react */
import { css, Theme } from '@emotion/react';
import Image from 'next/image';
import { FormEventHandler, useState } from 'react';
import { useRecoilState } from 'recoil';

import { createCategory } from '../../data/actions';
import { userTokenState } from '../../states';
import { Icon } from '../ui/data-display/Icon';

import { AddCategoryInput } from './NavigationBar/AddCategoryInput';
import { CategoryList } from './NavigationBar/CategoryList';
import { CategoryListItem } from './NavigationBar/CategoryListItem';

interface NavigationBarProps {
  currentCategoryId?: string;
  onSelect: ({ categoryId }: { categoryId: string }) => void;
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

export const NavigationBar = ({ currentCategoryId, onSelect }: NavigationBarProps) => {
  const [userToken, setUserToken] = useRecoilState(userTokenState);
  const [displayAddCategoryForm, setDisplayAddCategoryForm] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  const onCreateCategory: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await createCategory({ name: categoryName, token: userToken });

    setDisplayAddCategoryForm(false);
    setCategoryName('');
  };

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
          <CategoryListItem
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
      <CategoryList onSelect={onSelect} currentCategoryId={currentCategoryId} />
      {displayAddCategoryForm && (
        <form onSubmit={onCreateCategory}>
          <AddCategoryInput
            css={css`
              margin-bottom: 16px;
            `}
            onClose={() => {
              setDisplayAddCategoryForm(false);
            }}
            value={categoryName}
            onChange={(e) => {
              setCategoryName(e.target.value);
            }}
          />
        </form>
      )}
      <div
        css={css`
          margin-top: 12px;
          flex-grow: 1;
        `}
      >
        <button
          onClick={() => {
            setDisplayAddCategoryForm(true);
          }}
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
            css={(theme: Theme) => css`
              margin-left: 20px;
              color: ${theme.colors.secondary.white};
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
        <button onClick={() => setUserToken('')}>
          <Icon name="Logout" />
        </button>
      </div>
    </nav>
  );
};
