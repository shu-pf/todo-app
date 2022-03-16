import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { ToolTip } from '../../../components/ui/data-display/ToolTip';

const meta: ComponentMeta<typeof ToolTip> = {
  component: ToolTip,
};

export default meta;

const Template: ComponentStory<typeof ToolTip> = (args) => <ToolTip {...args} />;

export const Default = Template.bind({});
Default.args = {
  options: [
    { key: 'CreatedAt', value: 'Created At' },
    { key: 'Categories', value: 'Categories' },
    { key: 'Priority', value: 'Priority' },
  ],
};
