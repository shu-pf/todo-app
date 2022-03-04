import Add from './icons/add.svg';
import CheckBox from './icons/check-box.svg';
import Check from './icons/check.svg';
import Create from './icons/create.svg';
import Delete from './icons/delete.svg';
import Error from './icons/error.svg';
import Home from './icons/home.svg';
import Kitchen from './icons/kitchen.svg';
import Layers from './icons/layers.svg';
import List from './icons/list.svg';
import Logout from './icons/logout.svg';
import Whatshot from './icons/whatshot.svg';
import Work from './icons/work.svg';

const Icons = {
  Add,
  Delete,
  Error,
  Check,
  CheckBox,
  Logout,
  Work,
  Kitchen,
  Whatshot,
  Home,
  Layers,
  List,
  Create,
} as const;

export type IconNames = keyof typeof Icons;

interface IconProps {
  name: IconNames;
}

type Props = IconProps & JSX.IntrinsicElements['svg'];

export const Icon = ({ name, ...props }: Props) => {
  const Component = Icons[name];
  return <Component {...props} />;
};
