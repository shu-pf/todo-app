import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { Task } from '../../../components/ui/data-display/Task';

const meta: ComponentMeta<typeof Task> = {
  component: Task,
};

export default meta;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: '高沼カリキュラムを終わらせる',
  category: 'Work',
  limit: '2020-5-4',
};
Default.parameters = {
  backgrounds: { default: 'light' },
};

export const Checked = Template.bind({});
Checked.args = {
  title: '高沼カリキュラムを終わらせる',
  category: 'Work',
  limit: '2020-5-4',
  checked: true,
};
Checked.parameters = {
  backgrounds: { default: 'light' },
};
