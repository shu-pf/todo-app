import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { Spinner } from '../../components/common/Spinner';

const meta: ComponentMeta<typeof Spinner> = {
  component: Spinner,
};

export default meta;

const Template: ComponentStory<typeof Spinner> = (args) => <Spinner {...args} />;

export const Default = Template.bind({});
Default.parameters = {
  backgrounds: { default: 'dark' },
};

export const Black = Template.bind({});
Black.args = {
  color: '#000',
};
