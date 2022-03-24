/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';

import { Header } from '../layout/Header';
import { NavigationBar } from '../layout/NavigationBar';
import { TaskList } from '../model/task/TaskList';

export const IndexPage = () => {
  const [categoryId, setCategoryId] = useState('');

  return (
    <>
      <div
        css={css`
          display: grid;
          height: 100vh;
          grid-template: 'navigation header' 'navigation main' 1fr / auto 1fr;
        `}
      >
        <div
          css={css`
            grid-area: navigation;
          `}
        >
          <NavigationBar
            onSelect={({ categoryId }) => setCategoryId(categoryId)}
            currentCategoryId={categoryId}
          />
        </div>
        <div
          css={css`
            grid-area: header;
          `}
        >
          <Header categoryId={categoryId} />
        </div>
        <main
          css={css`
            grid-area: main;
            padding: 27px 19px;
            overflow: scroll;
          `}
        >
          <TaskList categoryId={categoryId} />
        </main>
      </div>
    </>
  );
};
