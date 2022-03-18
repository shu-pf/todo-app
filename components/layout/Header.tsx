import { css, Theme } from '@emotion/react';
import { useState, useEffect } from 'react';

import { useCategoryList } from '../../data/hooks';

/** @jsxImportSource @emotion/react */
interface HeaderProps {
  categoryId: string;
}

export const Header = ({ categoryId }: HeaderProps) => {
  const [title, setTitle] = useState('');
  const { categories, isLoading } = useCategoryList();

  useEffect(() => {
    if (!categories) {
      return;
    }
    const [category] = categories.filter((c) => c.id === categoryId);
    if (category) setTitle(category.name);
    else setTitle('All Categories');
  }, [categories, categoryId]);

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
        {isLoading ? '' : title}
      </h1>
    </div>
  );
};
