import Add from './icons/add.svg';

const Icons = { Add } as const;

export type IconNames = keyof typeof Icons;

interface IconProps {
  name: IconNames;
}

export const Icon = ({ name, ...props }: IconProps) => {
  const Component = Icons[name];
  return <Component {...props} />;
};
