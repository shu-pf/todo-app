import { css, Theme } from '@emotion/react';
import { useState, useEffect } from 'react';

import { useCategoryList } from '../../data/hooks';
import { EditCategoryForm } from '../model/category/EditCategoryForm';
import { ModalProvider } from '../provider/ModalProvider';
import { Icon } from '../ui/data-display/Icon';

/** @jsxImportSource @emotion/react */
interface HeaderProps {
  categoryId: string;
}

export const Header = ({ categoryId }: HeaderProps) => {
  const [categoryName, setCategoryName] = useState('');
  const [displayEditCategoryModal, setDisplayEditCategoryModal] = useState(false);
  const { categories, isLoading } = useCategoryList();

  useEffect(() => {
    if (!categories) {
      return;
    }
    const category = categories.find((c) => c.id === categoryId);
    if (category) setCategoryName(category.name);
  }, [categories, categoryId]);

  return (
    <>
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
        {!isLoading && (
          <>
            <h1
              css={css`
                margin-left: 20px;
                font-size: 24px;
              `}
            >
              {categoryName ? categoryName : 'All Categories'}
            </h1>
            {categoryName && (
              <div
                css={css`
                  margin-left: 4px;
                  cursor: pointer;
                `}
                onClick={() => setDisplayEditCategoryModal(true)}
              >
                <Icon name="Pencil" />
              </div>
            )}
          </>
        )}
      </div>
      {displayEditCategoryModal && (
        <ModalProvider position="right" onClick={() => setDisplayEditCategoryModal(false)}>
          <EditCategoryForm
            categoryId={categoryId}
            onCancel={() => setDisplayEditCategoryModal(false)}
            onSubmitted={() => setDisplayEditCategoryModal(false)}
          />
        </ModalProvider>
      )}
    </>
  );
};
