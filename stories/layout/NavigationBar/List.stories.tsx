import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ListItem } from '../../../components/layout/NavigationBar/ListItem';

const meta: ComponentMeta<typeof ListItem> = {
  title: 'component/layout/NavigationBar/ListItem',
  component: ListItem,
  parameters: {
    backgrounds: {
      default: 'pink',
      values: [{ name: 'pink', value: '#FF5470' }],
    },
  },
};

export default meta;

const Template: ComponentStory<typeof ListItem> = (args) => <ListItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'Work',
};

export const Active = Template.bind({});
Active.args = {
  name: 'Work',
  active: true,
};
