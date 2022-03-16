/** @jsxImportSource @emotion/react */

import { css, Theme, useTheme } from '@emotion/react';
import { FormEventHandler, MouseEventHandler, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { deleteTask, updateTask } from '../../../data/actions';
import { useCategoryList, useTask } from '../../../data/hooks';
import { HttpError } from '../../../data/libs/fetchers';
import { userTokenState } from '../../../states';
import { Icon } from '../../ui/data-display/Icon';
import { Spinner } from '../../ui/feedback/Spinner';
import { Button } from '../../ui/input/Button';
import { DateInput } from '../../ui/input/DateInput';
import { Select, Option } from '../../ui/input/Select';
import { Textarea } from '../../ui/input/Textarea';
import { TextInput } from '../../ui/input/TextInput';

interface EditTaskFormProps {
  taskId: string;
  onCancel?: () => void;
  onSubmitted?: () => void;
  onDeleted?: () => void;
}

const labelStyle = css`
  font-size: 14px;
  font-weight: 500;
`;

export const EditTaskForm = ({
  taskId,
  onCancel: emitCancelEvent,
  onSubmitted,
  onDeleted,
}: EditTaskFormProps) => {
  const { categories, isLoading: categoryIsLoading } = useCategoryList();
  const { task, isLoading: taskIsLoading } = useTask(taskId);
  const [options, setOptions] = useState<Option[]>([]);
  const userToken = useRecoilValue(userTokenState);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [limit, setLimit] = useState('');
  const [detail, setDetail] = useState('');
  const [checked, setChecked] = useState(false);

  const theme = useTheme();

  useEffect(() => {
    if (!task) {
      return;
    }

    setTitle(task.title);
    setCategory(task.category);
    setLimit(task.limit);
    setDetail(task.detail);
    setChecked(task.checked);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskIsLoading]);

  useEffect(() => {
    if (categories) {
      setOptions(
        categories.map((category) => {
          return {
            value: category.name,
            key: category.id,
          };
        })
      );
    }
  }, [categories]);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      await updateTask({
        token: userToken,
        task: {
          title,
          checked,
          category,
          limit,
          detail,
        },
        taskId,
      });
      onSubmitted && onSubmitted();
    } catch (e) {
      if (e instanceof HttpError) {
        window.alert('更新に失敗しました。Error Message: ' + e.data.error);
        return;
      }
      throw e;
    }
  };

  const onDelete = async () => {
    try {
      await deleteTask({ taskId, token: userToken });
      onDeleted && onDeleted();
    } catch (e) {
      if (e instanceof HttpError) {
        window.alert('削除に失敗しました。Error Message: ' + e.data.error);
        return;
      }
      throw e;
    }
  };

  const onCancel: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    emitCancelEvent && emitCancelEvent();
  };

  return (
    <form
      css={(theme: Theme) => css`
        width: 348px;
        height: 100vh;
        background: ${theme.colors.secondary.white};
        color: ${theme.colors.text.navy};
      `}
      onSubmit={onSubmit}
    >
      {/* header */}
      <div
        css={(theme: Theme) =>
          css`
            background-color: ${theme.colors.component.sliverWhite};
            height: 96px;
            display: flex;
            padding: 0 19px;
            justify-content: space-between;
            align-items: center;
          `
        }
      >
        <h1
          css={css`
            font-weight: 300;
            font-size: 24px;
          `}
        >
          Edit Task
        </h1>
        <button onClick={onCancel}>
          <Icon name="Clear" />
        </button>
      </div>
      {/* body */}
      {categoryIsLoading || taskIsLoading ? (
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
              position: relative;
            `}
          >
            <Icon
              css={(theme: Theme) => css`
                position: absolute;
                right: 0;
                cursor: pointer;
                &:hover {
                  path {
                    fill: ${theme.colors.primary.pink};
                  }
                }
              `}
              name="Delete"
              onClick={onDelete}
            />
            <label>
              <span css={labelStyle}>Title</span>
              <TextInput
                size="small"
                type="text"
                css={(theme: Theme) => css`
                  display: block;
                  width: 100%;
                  color: ${theme.colors.text.navy};
                `}
                variant="outlined"
                value={title}
                onChange={(e) => {
                  setTitle(e.currentTarget.value);
                }}
                required
              />
            </label>
          </div>
          <div
            css={css`
              margin-bottom: 12px;
            `}
          >
            <label>
              <span css={labelStyle}>
                Category
                <Select
                  options={options}
                  placeholder="カテゴリーを選択してください"
                  value={category}
                  onChange={(option) => {
                    setCategory(option.value);
                  }}
                />
              </span>
            </label>
          </div>
          <div
            css={css`
              margin-bottom: 12px;
            `}
          >
            <label>
              <span css={labelStyle}>
                Dead line
                <DateInput value={limit} onChange={(e) => setLimit(e.currentTarget.value)} />
              </span>
            </label>
          </div>
          <div
            css={(theme: Theme) => css`
              padding-bottom: 12px;
              border-bottom: 1px solid ${theme.colors.component.lighterLightGray};
            `}
          >
            <label>
              <span css={labelStyle}>
                Detail
                <Textarea value={detail} onChange={(e) => setDetail(e.currentTarget.value)} />
              </span>
            </label>
          </div>
          <div
            css={css`
              margin-top: 12px;
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
