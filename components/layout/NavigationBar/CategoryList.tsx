/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useCategoryList } from '../../../data/category';
import { CategoryListItem } from './CategoryListItem';

interface CategoryListProps {
  currentCategoryId?: string;
  onSelect?: ({ categoryId }: { categoryId: string }) => void;
}

export const CategoryList = ({ currentCategoryId, onSelect }: CategoryListProps) => {
  const { categories, isLoading, isError } = useCategoryList();

  if (isLoading) {
    return <>loading...</>;
  }

  if (isError) {
    return <></>;
  }

  return (
    <>
      {categories && (
        <div
          css={css`
            overflow: auto;
            margin-bottom: 12px;
          `}
        >
          <ul>
            {categories.map((category) => (
              <CategoryListItem
                key={category.id}
                name={category.name}
                active={category.id === currentCategoryId}
                onClick={() => {
                  onSelect && onSelect({ categoryId: category.id });
                }}
                css={css`
                  margin-bottom: 16px;
                `}
              />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};