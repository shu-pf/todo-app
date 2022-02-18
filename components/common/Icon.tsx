import Add from './icons/add.svg';
import Delete from './icons/delete.svg';
import Error from './icons/error.svg';

const Icons = { Add, Delete, Error } as const;

export type IconNames = keyof typeof Icons;

interface IconProps {
  name: IconNames;
}

type Props = IconProps & JSX.IntrinsicElements['svg'];

export const Icon = ({ name, ...props }: Props) => {
  const Component = Icons[name];
  return <Component {...props} />;
};
