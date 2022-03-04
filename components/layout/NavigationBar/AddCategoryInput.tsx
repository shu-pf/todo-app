import { css, Theme } from '@emotion/react';

import { Icon } from '../../common/Icon';

/** @jsxImportSource @emotion/react */
type Props = JSX.IntrinsicElements['input'] & {
  className?: string;
  onClose?: () => void;
};

export const AddCategoryInput = ({ className, onClose, ...props }: Props) => {
  return (
    <div
      className={className}
      css={css`
        position: relative;
      `}
    >
      <Icon
        css={(theme: Theme) => css`
          cursor: pointer;
          position: absolute;
          right: 4px;
          top: 50%;
          transform: translateY(-50%);
          vertical-align: middle;
          path {
            fill: ${theme.colors.secondary.white54};
          }
        `}
        name="Delete"
        onClick={onClose}
      ></Icon>
      <Icon
        css={css`
          margin-right: 23px;
          vertical-align: middle;
        `}
        name="Layers"
      />
      <input
        type="text"
        css={(theme: Theme) => css`
          border: 1px solid ${theme.colors.secondary.white54};
          color: ${theme.colors.secondary.white54};
          border-radius: 5px;
          padding: 4px 8px;
          vertical-align: middle;
          width: calc(100% - 28px - 23px);
        `}
        {...props}
      />
    </div>
  );
};
