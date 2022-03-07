import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { Textarea } from '../../../components/ui/input/Textarea';

const meta: ComponentMeta<typeof Textarea> = {
  component: Textarea,
};

export default meta;

const Template: ComponentStory<typeof Textarea> = (args) => <Textarea {...args} />;

export const Default = Template.bind({});
Default.args = {};
