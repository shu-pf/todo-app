import { css, Theme } from '@emotion/react';

interface Option {
  key: string;
  value: string;
}

interface ToolTipProps {
  options: Option[];
  onClick: ({ key }: { key: string; value: string }) => void;
}

/** @jsxImportSource @emotion/react */
export const ToolTip = ({ options, onClick }: ToolTipProps) => {
  return (
    <div
      css={(theme: Theme) => css`
        position: relative;
        display: inline-block;
        padding: 12px 0;
        background-color: ${theme.colors.component.pureWhite};
        box-shadow: 0px 0px 13px ${theme.colors.component.shadowBlack};
        border-radius: 5px;
      `}
    >
      <div
        css={css`
          position: absolute;
          top: -6px;
          right: 20px;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 0 8.5px 6px 8.5px;
          border-color: transparent transparent #ffffff transparent;
        `}
      ></div>
      <ul>
        {options.map((option) => (
          <li
            key={option.key}
            css={(theme: Theme) => css`
              padding: 5px 12px;
              color: ${theme.colors.text.gray};
              cursor: pointer;
              &:hover {
                background-color: ${theme.colors.component.lighterLightGray};
              }
            `}
            onClick={() => onClick({ key: option.key, value: option.value })}
          >
            {option.value}
          </li>
        ))}
      </ul>
    </div>
  );
};
