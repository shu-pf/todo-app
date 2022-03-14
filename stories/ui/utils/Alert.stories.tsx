import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Alert } from '../../../components/ui/utils/Alert';

const meta: ComponentMeta<typeof Alert> = {
  component: Alert,
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export default meta;

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />;

export const Default = Template.bind({});
Default.args = {
  message: 'この操作は取り消し出来ません。タスク「高沼カリキュラムをおわらせる」を削除します。',
};
