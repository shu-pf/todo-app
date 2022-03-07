/** @jsxImportSource @emotion/react */
import { css, Theme } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';

import { Icon } from '../data-display/Icon';

export interface Option {
  value: string;
  key: string;
}

interface Props {
  value?: string;
  options: Option[];
  placeholder?: string;
  onChange?: (option: Option) => void;
}

interface OptionProps {
  divRef: HTMLDivElement | null;
  options: Option[];
  onSelect: (option: Option) => void;
  onCancel: () => void;
  active: boolean;
}

const Options = ({ divRef, active, options, onSelect, onCancel }: OptionProps) => {
  const [optionsTopPixel, setOptionsTopPixel] = useState(0);
  const optionsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!optionsRef.current || !divRef) {
      return;
    }

    if (active) {
      const optionsElementHeight = optionsRef.current.offsetHeight;
      const remainingHeight = window.innerHeight - divRef.getBoundingClientRect().top;

      if (remainingHeight < optionsElementHeight) {
        setOptionsTopPixel(remainingHeight - optionsElementHeight);
      } else {
        setOptionsTopPixel(0);
      }
    }
  }, [active, divRef]);

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
            onClick={() => onSelect(option)}
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

export const Select = ({ value = '', options, onChange, placeholder = '' }: Props) => {
  const [active, setActive] = useState(false);
  const [localValue, setLocalValue] = useState('');

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const divRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        css={css`
          width: 100%;
          position: relative;
        `}
      >
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
          onSelect={(option) => {
            setActive(false);
            setLocalValue(option.value);
            onChange && onChange(option);
          }}
          divRef={divRef.current}
          active={active}
          onCancel={() => setActive(false)}
        />
      </div>
    </>
  );
};
