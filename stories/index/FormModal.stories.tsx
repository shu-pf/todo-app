import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FormModal } from '../../components/index/FormModal';
import { Middleware, SWRConfig, SWRResponse } from 'swr';

const meta: ComponentMeta<typeof FormModal> = {
  component: FormModal,
};

export default meta;

const Template: ComponentStory<typeof FormModal> = (args) => <FormModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Add new Task',
};
