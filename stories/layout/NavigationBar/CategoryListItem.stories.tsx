import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CategoryListItem } from '../../../components/layout/NavigationBar/CategoryListItem';

const meta: ComponentMeta<typeof CategoryListItem> = {
  component: CategoryListItem,
  parameters: {
    backgrounds: {
      default: 'pink',
      values: [{ name: 'pink', value: '#FF5470' }],
    },
  },
};

export default meta;

const Template: ComponentStory<typeof CategoryListItem> = (args) => <CategoryListItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'Work',
};

export const Active = Template.bind({});
Active.args = {
  name: 'Work',
  active: true,
};
