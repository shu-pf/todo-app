/** @jsxImportSource @emotion/react */
import { css, Theme, useTheme } from '@emotion/react';
import { useMemo, useState } from 'react';
import _uniqueId from 'lodash/uniqueId';

type InputProps = JSX.IntrinsicElements['input'];
type Variant = 'default' | 'outlined';
type Props = InputProps & { labelText: string; variant: Variant };

function style(theme: Theme) {
  const baseStyle = {
    label: css`
      display: block;
      letter-spacing: 0.05em;
      color: ${theme.colors.text.navy};
    `,
    input: css`
      background-color: ${theme.colors.component.pureWhite};
      border-radius: 5px;
      padding: 12px;
    `,
  };

  return {
    default: {
      label: baseStyle.label,
      input: [
        baseStyle.input,
        css`
          box-shadow: 0px 0px 13px ${theme.colors.component.shadowBlack};
        `,
      ],
    },
    outlined: {
      label: baseStyle.label,
      input: [
        baseStyle.input,
        css`
          border: 1px solid ${theme.colors.component.lighterLightGray};
        `,
      ],
    },
  };
}

export const Input = ({ labelText = '', variant = 'default', id, ...props }: Props) => {
  const [computedId] = useState(id ? id : _uniqueId('input-'));

  const theme = useTheme();
  const serializedStyles = useMemo(() => style(theme), [theme]);

  return (
    <>
      {labelText && (
        <label htmlFor={computedId} css={serializedStyles[variant].label}>
          {labelText}
        </label>
      )}
      <input id={computedId} css={serializedStyles[variant].input} {...props} />
    </>
  );
};
