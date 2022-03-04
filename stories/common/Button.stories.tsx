import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { Button } from '../../components/common/Button';

const meta: ComponentMeta<typeof Button> = {
  component: Button,
  argTypes: { onClick: { action: 'clicked' } },
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

export const Icon = Template.bind({});
Icon.args = {
  label: 'Button',
  variant: 'primary',
  icon: 'Add',
};
