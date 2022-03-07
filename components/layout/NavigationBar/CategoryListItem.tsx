/** @jsxImportSource @emotion/react */
import { css, Theme } from '@emotion/react';
import { MouseEventHandler } from 'react';
import { useEffect, useState } from 'react';

import { Icon, IconNames } from '../../ui/data-display/Icon';

interface CategoryListItemProps {
  name: string;
  active?: boolean;
  onClick: MouseEventHandler<HTMLLIElement>;
  className?: string;
}

const activeStyle = css`
  opacity: 1;
`;

const getIconName = (name: string): IconNames => {
  switch (name) {
    case 'All':
      return 'List';
    case 'Work':
      return 'Work';
    case 'お買い物リスト':
      return 'Kitchen';
    case '買いたい':
      return 'Whatshot';
    case 'House':
      return 'Home';
    default:
      return 'Layers';
  }
};

export const CategoryListItem = ({
  name,
  active = false,
  onClick,
  className,
}: CategoryListItemProps) => {
  const [iconName, setIconName] = useState<IconNames>('Layers');

  useEffect(() => {
    setIconName(getIconName(name));
  }, [name]);

  return (
    <li
      css={[
        css`
          cursor: pointer;
          display: flex;
          align-items: center;
          opacity: 0.54;
          transition: 0.3s;
          :hover {
            opacity: 1;
          }
        `,
        active && activeStyle,
      ]}
      className={className}
      onClick={onClick}
    >
      <Icon
        name={iconName}
        css={(theme: Theme) => css`
          path {
            fill: ${theme.colors.secondary.white};
            fill-opacity: 1;
          }
        `}
      />
      <div
        css={(theme: Theme) => css`
          margin-left: 23px;
          font-size: 18px;
          color: ${theme.colors.secondary.white};
        `}
      >
        {name}
      </div>
    </li>
  );
};
