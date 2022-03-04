import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AddCategoryInput } from '../../../components/layout/NavigationBar/AddCategoryInput';

const meta: ComponentMeta<typeof AddCategoryInput> = {
  component: AddCategoryInput,
  parameters: {
    backgrounds: {
      default: 'pink',
      values: [{ name: 'pink', value: '#FF5470' }],
    },
  },
};

export default meta;

const Template: ComponentStory<typeof AddCategoryInput> = (args) => <AddCategoryInput {...args} />;

export const Default = Template.bind({});
