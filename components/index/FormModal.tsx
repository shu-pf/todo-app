/** @jsxImportSource @emotion/react */
import { css, Theme } from '@emotion/react';
import { Button } from '../common/Button';
import { DateInput } from '../common/DateInput';
import { Icon } from '../common/Icon';
import { Select } from '../common/Select';
import { Textarea } from '../common/Textarea';
import { TextInput } from '../common/TextInput';

interface FormModalProps {
  title: string;
}

const labelStyle = css`
  font-size: 14px;
  font-weight: 500;
`;

export const FormModal = ({ title }: FormModalProps) => {
  const categories = [
    {
      id: 'oeijfeowijfwoeijk',
      name: 'Work',
    },
    {
      id: 'feoijfeifjeoifjk',
      name: 'お買物リスト',
    },
    {
      id: 'feoijfeoijfeoifj',
      name: '買いたい',
    },
    {
      id: 'fwoefjwlekffewogn',
      name: 'House',
    },
    {
      id: 'rigjrokanklrkwgnk',
      name: 'その他',
    },
  ];

  const options = categories.map((category) => {
    return {
      value: category.name,
      key: category.id,
    };
  });

  return (
    <div
      css={(theme: Theme) => css`
        width: 348px;
        height: 100vh;
        background: ${theme.colors.secondary.white};
        color: ${theme.colors.text.navy};
      `}
    >
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
          {title}
        </h1>
        <button>
          <Icon name="Clear" />
        </button>
      </div>
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
            <span css={labelStyle}>Title</span>
            <TextInput
              name="title"
              size="small"
              type="text"
              css={(theme: Theme) => css`
                display: block;
                width: 100%;
                color: ${theme.colors.text.navy};
              `}
              variant="outlined"
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
              <Select name="category" options={options} />
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
              <DateInput name="dead-line" />
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
              <Textarea name="detail" />
            </span>
          </label>
        </div>
        <div
          css={css`
            margin-top: 12px;
          `}
        >
          <Button
            label="Cancel"
            variant="outlined"
            css={css`
              width: calc(50% - 2px);
              margin-right: 4px;
            `}
          />
          <Button
            label="Add"
            variant="primary"
            css={css`
              width: calc(50% - 2px);
            `}
          />
        </div>
      </div>
    </div>
  );
};
function useCategoryList(): { categories: any } {
  throw new Error('Function not implemented.');
}
