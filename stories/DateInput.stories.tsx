import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DateInput } from '../components/common/DateInput';

const meta: ComponentMeta<typeof DateInput> = {
  title: 'component/common/DateInput',
  component: DateInput,
};

export default meta;

const Template: ComponentStory<typeof DateInput> = (args) => <DateInput {...args} />;

export const Default = Template.bind({});
Default.args = {};
