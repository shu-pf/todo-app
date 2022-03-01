/** @jsxImportSource @emotion/react */
import { css, Theme } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';

interface Option {
  value: string;
  key: string;
}

interface Props {
  value?: string;
  options: Option[];
  placeholder?: string;
  onChange: (option: Option) => void;
}

export const Select = ({ value = '', options, onChange, placeholder = '' }: Props) => {
  const [active, setActive] = useState(false);
  const [optionsTopPixel, setOptionsTopPixel] = useState(0);
  const optionsRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }
    if (!optionsRef.current) {
      return;
    }

    if (active) {
      const optionsElementHeight = optionsRef.current.offsetHeight;
      const remainingHeight = window.innerHeight - inputRef.current.getBoundingClientRect().top;

      if (remainingHeight < optionsElementHeight) {
        setOptionsTopPixel(remainingHeight - optionsElementHeight);
      }
    }
  }, [active]);

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
          ref={inputRef}
        >
          {value}
          {!value && (
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
        {active && (
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
                  onClick={() => {
                    setActive(false);
                    onChange(option);
                  }}
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
              onClick={() => {
                setActive(false);
              }}
            ></div>
          </>
        )}
      </div>
    </>
  );
};
