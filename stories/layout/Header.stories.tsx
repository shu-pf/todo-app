import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Header } from '../../components/layout/Header';

const meta: ComponentMeta<typeof Header> = {
  component: Header,
};

export default meta;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'All Categories',
};
