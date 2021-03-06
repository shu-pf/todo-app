import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Middleware, SWRConfig, SWRResponse } from 'swr';

import { AddTaskForm } from '../../components/model/task/AddTaskForm';
import { EditTaskForm } from '../../components/model/task/EditTaskForm';
import { ModalProvider } from '../../components/provider/ModalProvider';
import { Alert } from '../../components/ui/utils/Alert';
import { categories, task } from '../../mocks/data';

const meta: ComponentMeta<typeof ModalProvider> = {
  component: ModalProvider,
  parameters: {
    docs: {
      inlineStories: false,
      iframeHeight: 700,
    },
  },
};

export default meta;

const Template: ComponentStory<typeof ModalProvider> = (args) => <ModalProvider {...args} />;

const middleware: Middleware = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (key): SWRResponse<any, any> => {
    let path;
    if (key && typeof key === 'object') {
      path = key[0];
    }

    const mockData: { [name: string]: unknown } = {
      '/api/tasks/pirgnojgn': task,
      '/api/categories': categories,
    };

    return {
      data: mockData?.[path],
      error: undefined,
      mutate: () => Promise.resolve(),
      isValidating: false,
    };
  };
};

export const NoContent = Template.bind({});
export const AddTaskFormModal = Template.bind({});
AddTaskFormModal.args = {
  position: 'right',
  children: <AddTaskForm />,
};
AddTaskFormModal.decorators = [
  (story) => <SWRConfig value={{ use: [middleware] }}>{story()}</SWRConfig>,
];

export const EditTaskFormModal = Template.bind({});
EditTaskFormModal.args = {
  position: 'right',
  children: <EditTaskForm taskId="pirgnojgn" />,
};
EditTaskFormModal.decorators = [
  (story) => <SWRConfig value={{ use: [middleware] }}>{story()}</SWRConfig>,
];

export const AlertModal = Template.bind({});
AlertModal.args = {
  position: 'center',
  children: (
    <Alert message="この操作は取り消し出来ません。カテゴリー「Work」を削除します。カテゴリーに登録されているタスクも全て削除されます。" />
  ),
};
