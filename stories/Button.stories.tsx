import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from '../components/common/Button';

const meta: ComponentMeta<typeof Button> = {
  title: 'component/common/Button',
  component: Button,
};

export default meta;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Button',
};

export const Error = Template.bind({});
Error.args = {
  label: 'Button',
  variant: 'error',
};

export const Outlined = Template.bind({});
Outlined.args = {
  label: 'Button',
  variant: 'outlined',
};

export const Underlined = Template.bind({});
Underlined.args = {
  label: 'Button',
  variant: 'underlined',
};
Underlined.parameters = {
  backgrounds: { default: 'dark' },
};
