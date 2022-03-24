import { css, useTheme } from '@emotion/react';
import { FormEventHandler, MouseEventHandler, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { deleteCategory, updateCategory } from '../../../data/actions';
import { useCategoryList } from '../../../data/hooks';
import { HttpError } from '../../../data/libs/fetchers';
import { userTokenState } from '../../../states';
import { Icon } from '../../ui/data-display/Icon';
import { Spinner } from '../../ui/feedback/Spinner';
import { Button } from '../../ui/input/Button';
import { TextInput } from '../../ui/input/TextInput';

/** @jsxImportSource @emotion/react */
interface Props {
  categoryId: string;
  onCancel?: () => void;
  onSubmitted?: () => void;
  onDeleted?: () => void;
}

const labelStyle = css`
  font-size: 14px;
  font-weight: 500;
`;

export const EditCategoryForm = ({
  categoryId,
  onCancel: emitCancelEvent,
  onSubmitted,
  onDeleted,
}: Props) => {
  const theme = useTheme();
  const { categories, isLoading } = useCategoryList();
  const userToken = useRecoilValue(userTokenState);

  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    if (!categories) {
      return;
    }

    const category = categories.filter((category) => category.id === categoryId)[0];
    setCategoryName(category.name);
  }, [categories, categoryId, isLoading]);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      await updateCategory({ categoryId, token: userToken, name: categoryName });
      onSubmitted && onSubmitted();
    } catch (e) {
      if (e instanceof HttpError) {
        window.alert('更新に失敗しました。Error Message: ' + e.data.error);
        return;
      }
      throw e;
    }
  };

  const onCancel: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    emitCancelEvent?.();
  };

  const onDelete: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    try {
      await deleteCategory({ categoryId, token: userToken });
      onDeleted?.();
    } catch (e) {
      if (e instanceof HttpError) {
        window.alert('削除に失敗しました。Error Message: ' + e.data.error);
        return;
      }
      throw e;
    }
  };

  return (
    <form
      css={css`
        width: 348px;
        height: 100vh;
        background: ${theme.colors.secondary.white};
        color: ${theme.colors.text.navy};
      `}
      onSubmit={onSubmit}
    >
      {/* header */}
      <div
        css={css`
          background-color: ${theme.colors.component.sliverWhite};
          height: 96px;
          display: flex;
          padding: 0 19px;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <h1
          css={css`
            font-weight: 300;
            font-size: 24px;
          `}
        >
          Edit Category
        </h1>
        <button onClick={onCancel}>
          <Icon name="Clear" />
        </button>
      </div>
      {/* body */}
      {isLoading ? (
        <div
          css={css`
            display: flex;
            height: 100%;
            justify-content: center;
            align-items: center;
          `}
        >
          <Spinner color={theme.colors.text.navy}></Spinner>
        </div>
      ) : (
        <div
          css={css`
            padding: 32px 21px;
          `}
        >
          <div
            css={css`
              margin-bottom: 12px;
            `}
          >
            <label>
              <span css={labelStyle}>Category Name</span>
              <TextInput
                size="small"
                type="text"
                css={css`
                  display: block;
                  width: 100%;
                  color: ${theme.colors.text.navy};
                `}
                variant="outlined"
                value={categoryName}
                onChange={(e) => {
                  setCategoryName(e.currentTarget.value);
                }}
                required
              />
            </label>
            <div
              css={css`
                margin-top: 8px;
              `}
            >
              <Button label="削除" variant="error" width="100%" size="small" onClick={onDelete} />
            </div>
          </div>
          {/* footer */}
          <div
            css={css`
              padding-top: 12px;
              border-top: 1px solid ${theme.colors.component.lighterLightGray};
              display: flex;
            `}
          >
            <Button
              label="Cancel"
              variant="outlined"
              css={css`
                width: calc(50% - 2px);
                margin-right: 4px;
              `}
              onClick={onCancel}
            />
            <Button
              type="submit"
              label="Update"
              variant="primary"
              css={css`
                width: calc(50% - 2px);
              `}
            />
          </div>
        </div>
      )}
    </form>
  );
};
