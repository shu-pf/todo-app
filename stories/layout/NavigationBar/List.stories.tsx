import { ComponentStory, ComponentMeta } from '@storybook/react';
import { List } from '../../../components/layout/NavigationBar/List';

const meta: ComponentMeta<typeof List> = {
  title: 'component/layout/NavigationBar/List',
  component: List,
  parameters: {
    backgrounds: {
      default: 'pink',
      values: [{ name: 'pink', value: '#FF5470' }],
    },
  },
};

export default meta;

const Template: ComponentStory<typeof List> = (args) => <List {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'Work',
};

export const Active = Template.bind({});
Active.args = {
  name: 'Work',
  active: true,
};
