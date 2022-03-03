import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Textarea } from '../components/common/Textarea';

const meta: ComponentMeta<typeof Textarea> = {
  title: 'component/common/Textarea',
  component: Textarea,
};

export default meta;

const Template: ComponentStory<typeof Textarea> = (args) => <Textarea {...args} />;

export const Default = Template.bind({});
Default.args = {};
