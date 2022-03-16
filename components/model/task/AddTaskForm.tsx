/** @jsxImportSource @emotion/react */

import { css, Theme } from '@emotion/react';
import { FormEventHandler, MouseEventHandler, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { createTask } from '../../../data/actions';
import { useCategoryList } from '../../../data/hooks';
import { HttpError } from '../../../data/libs/fetchers';
import { userTokenState } from '../../../states';
import { Icon } from '../../ui/data-display/Icon';
import { Button } from '../../ui/input/Button';
import { DateInput } from '../../ui/input/DateInput';
import { Select, Option } from '../../ui/input/Select';
import { Textarea } from '../../ui/input/Textarea';
import { TextInput } from '../../ui/input/TextInput';

interface AddTaskFormProps {
  onCancel?: () => void;
  onSubmitted?: () => void;
}

const labelStyle = css`
  font-size: 14px;
  font-weight: 500;
`;

export const AddTaskForm = ({ onCancel: emitCancelEvent, onSubmitted }: AddTaskFormProps) => {
  const { categories } = useCategoryList();
  const [options, setOptions] = useState<Option[]>([]);
  const userToken = useRecoilValue(userTokenState);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [limit, setLimit] = useState('');
  const [detail, setDetail] = useState('');

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

  const clearForm = () => {
    setTitle('');
    setCategory('');
    setLimit('');
    setDetail('');
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      await createTask({
        token: userToken,
        task: {
          title,
          checked: false,
          category,
          limit,
          detail,
        },
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

  const onCancel: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    clearForm();
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
          Add new Task
        </h1>
        <button onClick={onCancel}>
          <Icon name="Clear" />
        </button>
      </div>
      {/* body */}
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
            label="Add"
            variant="primary"
            css={css`
              width: calc(50% - 2px);
            `}
          />
        </div>
      </div>
    </form>
  );
};
