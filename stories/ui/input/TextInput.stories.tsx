import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { TextInput } from '../../../components/ui/input/TextInput';

const meta: ComponentMeta<typeof TextInput> = {
  component: TextInput,
};

export default meta;

const Template: ComponentStory<typeof TextInput> = (args) => <TextInput {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  placeholder: 'email',
};

export const Outlined = Template.bind({});
Outlined.args = {
  variant: 'outlined',
};

export const Password = Template.bind({});
Password.args = {
  placeholder: 'password',
  type: 'password',
};

export const SmallOutlined = Template.bind({});
SmallOutlined.args = {
  variant: 'outlined',
  type: 'text',
  size: 'small',
};
