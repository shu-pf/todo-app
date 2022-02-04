import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from '../components/common/Button';

const meta: ComponentMeta<typeof Button> = {
  title: 'Button',
  component: Button,
};

export default meta;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Button',
};
