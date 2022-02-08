import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Input } from '../components/common/Input';

const meta: ComponentMeta<typeof Input> = {
  title: 'Input',
  component: Input,
};

export default meta;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  placeholder: 'email',
};

export const Outlined = Template.bind({});
Outlined.args = {
  variant: 'outlined',
  labelText: 'Title',
};
