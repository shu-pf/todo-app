import { css, Theme } from '@emotion/react';
import { Icon } from '../common/Icon';
import { MouseEventHandler } from 'react';

/** @jsxImportSource @emotion/react */
interface TaskProps {
  checked?: boolean;
  title: string;
  category: string;
  limit: string;
  onDelete: MouseEventHandler<SVGSVGElement>;
  onEdit: MouseEventHandler<SVGSVGElement>;
  onCheck: MouseEventHandler<HTMLButtonElement>;
}

// ex. monthNames[0]→Jan, monthNames[1]→Feb ...
const monthNames = [
  'Jan.',
  'Feb.',
  'Mar.',
  'Apr.',
  'May.',
  'Jun.',
  'Jul.',
  'Aug.',
  'Sep.',
  'Oct.',
  'Nov.',
  'Dec.',
] as const;

const iconBaseStyle = css`
  cursor: pointer;
  path {
    transition: 0.2s;
  }
`;

const textDecorationLine = css`
  position: relative;
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    height: 4px;
    background-color: #00ebc7;
    background: linear-gradient(to right, #00ebc7 0%, #00ddeb 100%);
    border-radius: 2px;
  }
`;

export const Task = ({
  checked = false,
  title,
  category,
  limit,
  onDelete,
  onEdit,
  onCheck,
}: TaskProps) => {
  // limitの形式: 2020/5/4
  const monthIndex = Number(limit.split('/')[1]) - 1;
  const month = monthNames[monthIndex];
  const day = limit.split('/')[2];

  return (
    <div
      css={css`
        display: flex;
      `}
    >
      <div
        css={css`
          padding: 14px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        `}
      >
        <div
          css={css`
            text-align: center;
            margin-bottom: 6px;
          `}
        >
          {day}
        </div>
        <div
          css={(theme: Theme) =>
            css`
              font-size: 14px;
              color: ${theme.colors.text.navy};
            `
          }
        >
          {month}
        </div>
      </div>
      <div
        css={(theme: Theme) =>
          css`
            display: flex;
            flex: auto;
            min-width: 0;
            align-items: flex-start;
            border: 1px solid ${theme.colors.component.lighterLightGray};
            border-radius: 5px;
            padding: 14px 20px;
            background-color: ${theme.colors.component.pureWhite};
          `
        }
      >
        <button
          css={css`
            margin-top: 4px;
          `}
          onClick={onCheck}
        >
          {checked ? (
            <Icon
              name="Check"
              css={css`
                margin-top: 2px;
              `}
            ></Icon>
          ) : (
            <Icon name="CheckBox"></Icon>
          )}
        </button>
        <div
          css={css`
            padding-left: 24px;
            flex: auto;
            min-width: 0;
            padding-right: 4px;
            font-size: 18px;
          `}
        >
          <div
            css={css`
              margin-bottom: 9px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            `}
          >
            <span css={checked && textDecorationLine}>{title}</span>
          </div>
          <div
            css={(theme: Theme) =>
              css`
                color: ${theme.colors.component.gray};
                font-size: 14px;
              `
            }
          >
            {category}
          </div>
        </div>
        <div
          css={css`
            display: flex;
          `}
        >
          <Icon
            css={(theme: Theme) => [
              iconBaseStyle,
              css`
                &:hover {
                  path {
                    fill: ${theme.colors.text.blue};
                  }
                }
              `,
            ]}
            name="Error"
            onClick={onEdit}
          />
          <Icon
            css={(theme: Theme) => [
              iconBaseStyle,
              css`
                &:hover {
                  path {
                    fill: ${theme.colors.primary.pink};
                  }
                }
              `,
            ]}
            name="Delete"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};
