import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { TextInput } from '../../components/common/TextInput';

const meta: ComponentMeta<typeof TextInput> = {
  component: TextInput,
};

export default meta;

const Template: ComponentStory<typeof TextInput> = (args) => <TextInput {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  name: 'email',
  placeholder: 'email',
};

export const Outlined = Template.bind({});
Outlined.args = {
  name: 'outlined',
  variant: 'outlined',
};

export const Password = Template.bind({});
Password.args = {
  name: 'password',
  placeholder: 'password',
  type: 'password',
};

export const SmallOutlined = Template.bind({});
SmallOutlined.args = {
  name: 'SmallOutlined',
  variant: 'outlined',
  type: 'text',
  size: 'small',
};
