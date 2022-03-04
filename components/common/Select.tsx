/** @jsxImportSource @emotion/react */
import { css, Theme } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';

interface Option {
  value: string;
  key: string;
}

interface Props {
  name: string;
  value?: string;
  options: Option[];
  placeholder?: string;
  onSelect?: (value: string) => void;
}

interface OptionProps {
  topPx: number | undefined;
  options: Option[];
  onSelect: (value: string) => void;
  onCancel: () => void;
  active: boolean;
}

const Options = ({ topPx, active, options, onSelect, onCancel }: OptionProps) => {
  const [optionsTopPixel, setOptionsTopPixel] = useState(0);
  const optionsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!optionsRef.current || !topPx) {
      return;
    }

    if (active) {
      const optionsElementHeight = optionsRef.current.offsetHeight;
      const remainingHeight = window.innerHeight - topPx;

      if (remainingHeight < optionsElementHeight) {
        setOptionsTopPixel(remainingHeight - optionsElementHeight);
      }
    }
  }, [active, topPx]);

  if (!active) {
    return <></>;
  }

  return (
    <>
      <ul
        css={(theme: Theme) =>
          css`
            position: absolute;
            box-shadow: 0px 0px 13px ${theme.colors.component.shadowBlack};
            background-color: ${theme.colors.secondary.white};
            padding: 6px;
            border-radius: 5px;
            top: ${optionsTopPixel}px;
            left: 0;
            width: 100%;
            max-height: 80vh;
            overflow-y: auto;
            overflow-x: hidden;
            z-index: 1;
          `
        }
        ref={optionsRef}
      >
        {options.map((option) => (
          <li
            css={(theme: Theme) => [
              css`
                display: flex;
                align-items: center;
                height: 35px;
                cursor: pointer;
                color: ${theme.colors.text.navy};
                &:hover {
                  background-color: ${theme.colors.component.lighterLightGray};
                }
              `,
            ]}
            key={option.key}
            onClick={() => onSelect(option.value)}
          >
            {option.value}
          </li>
        ))}
      </ul>
      <div
        css={css`
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 0;
        `}
        onClick={() => onCancel()}
      ></div>
    </>
  );
};

export const Select = ({ name, value = '', options, onSelect, placeholder = '' }: Props) => {
  const [active, setActive] = useState(false);

  const divRef = useRef<HTMLDivElement>(null);
  const [localValue, setLocalValue] = useState('');

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <>
      <div
        css={css`
          width: 100%;
          position: relative;
        `}
      >
        <input
          name={name}
          css={css`
            display: none;
          `}
          type="text"
          value={localValue}
        />
        <div
          css={(theme: Theme) => css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 35px;
            border: 1px solid ${theme.colors.component.lighterLightGray};
            background-color: ${theme.colors.secondary.white};
            border-radius: 5px;
            padding: 6px;
            cursor: pointer;
            color: ${theme.colors.text.navy};
          `}
          onClick={() => {
            setActive(true);
          }}
          ref={divRef}
        >
          {localValue}
          {!localValue && (
            <span
              css={(theme: Theme) =>
                css`
                  color: ${theme.colors.text.gray};
                `
              }
            >
              {placeholder}
            </span>
          )}
          <Icon name="ExpandMore" />
        </div>
        <Options
          options={options}
          onSelect={(value) => {
            setActive(false);
            setLocalValue(value);
            onSelect && onSelect(value);
          }}
          topPx={divRef.current?.getBoundingClientRect().top}
          active={active}
          onCancel={() => setActive(false)}
        />
      </div>
    </>
  );
};
