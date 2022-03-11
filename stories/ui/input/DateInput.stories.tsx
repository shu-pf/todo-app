import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { DateInput } from '../../../components/ui/input/DateInput';

const meta: ComponentMeta<typeof DateInput> = {
  component: DateInput,
};

export default meta;

const Template: ComponentStory<typeof DateInput> = (args) => <DateInput {...args} />;

export const Default = Template.bind({});
Default.args = {};
