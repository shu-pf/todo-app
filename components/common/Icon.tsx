import Add from './icons/add.svg';
import Delete from './icons/delete.svg';
import Error from './icons/error.svg';
import Check from './icons/check.svg';
import CheckBox from './icons/check-box.svg';

const Icons = { Add, Delete, Error, Check, CheckBox } as const;

export type IconNames = keyof typeof Icons;

interface IconProps {
  name: IconNames;
}

type Props = IconProps & JSX.IntrinsicElements['svg'];

export const Icon = ({ name, ...props }: Props) => {
  const Component = Icons[name];
  return <Component {...props} />;
};
