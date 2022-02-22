import { css, Theme } from '@emotion/react';
import { Icon } from '../common/Icon';
import { MouseEventHandler } from 'react';

/** @jsxImportSource @emotion/react */
interface TaskProps {
  title: string;
  category: string;
  limit: string;
  onDelete: MouseEventHandler<SVGSVGElement>;
  onEdit: MouseEventHandler<SVGSVGElement>;
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

export const Task = ({ title, category, limit, onDelete, onEdit }: TaskProps) => {
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
            justify-content: space-between;
            border: 1px solid ${theme.colors.component.lighterLightGray};
            border-radius: 5px;
            padding: 14px 20px;
            background-color: ${theme.colors.component.pureWhite};
          `
        }
      >
        <div
          css={css`
            padding-right: 4px;
            font-size: 18px;
          `}
        >
          <div
            css={css`
              margin-bottom: 9px;
            `}
          >
            {title}
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
