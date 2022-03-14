import { css, useTheme } from '@emotion/react';
import { MouseEventHandler } from 'react';

import { Button } from '../input/Button';

/** @jsxImportSource @emotion/react */
interface AlertModalProps {
  title?: string;
  message: string;
  successButtonLabel?: string;
  cancelButtonLabel?: string;
  onCancel?: MouseEventHandler<HTMLButtonElement>;
  onSuccess?: MouseEventHandler<HTMLButtonElement>;
}

export const Alert = ({
  title = '警告',
  message,
  successButtonLabel = '削除',
  cancelButtonLabel = '削除しない',
  onCancel,
  onSuccess,
}: AlertModalProps) => {
  const theme = useTheme();
  return (
    <div
      css={css`
        background-color: ${theme.colors.secondary.white};
        border-radius: 5px;
        overflow: hidden;
        width: 626px;
      `}
    >
      {/* Header */}
      <div
        css={css`
          background-color: ${theme.colors.primary.pink};
          padding: 14px 17px;
        `}
      >
        <h1
          css={css`
            color: ${theme.colors.text.white};
            font-size: 24px;
            font-weight: 300;
          `}
        >
          {title}
        </h1>
      </div>
      {/* Body */}
      <div
        css={css`
          padding: 18px;
        `}
      >
        <p
          css={css`
            margin-bottom: 40px;
          `}
        >
          {message}
        </p>
        <div
          css={css`
            display: flex;
            justify-content: center;
            column-gap: 18px;
          `}
        >
          <Button
            label={cancelButtonLabel}
            size="small"
            variant="outlined"
            width="114px"
            onClick={onCancel}
          />
          <Button
            label={successButtonLabel}
            size="small"
            variant="error"
            width="114px"
            onClick={onSuccess}
          />
        </div>
      </div>
    </div>
  );
};
