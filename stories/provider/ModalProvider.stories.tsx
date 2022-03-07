import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Middleware, SWRConfig, SWRResponse } from 'swr';

import { AddTaskForm } from '../../components/model/task/AddTaskForm';
import { EditTaskForm } from '../../components/model/task/EditTaskForm';
import { ModalProvider } from '../../components/provider/ModalProvider';

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

const categories = [
  {
    id: 'oeijfeowijfwoeijk',
    name: 'Work',
  },
  {
    id: 'feoijfeifjeoifjk',
    name: 'お買物リスト',
  },
  {
    id: 'feoijfeoijfeoifj',
    name: '買いたい',
  },
  {
    id: 'fwoefjwlekffewogn',
    name: 'House',
  },
  {
    id: 'rigjrokanklrkwgnk',
    name: 'その他',
  },
];

const task = {
  title: '{"title":"お米を買う","checked":false}',
  category: '買い物リスト',
  limit: '2022-03-05',
  detail: '次はあきたこまちがいいかもしれない',
};

const middleware: Middleware = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (key): SWRResponse<any, any> => {
    const mockData: { [name: string]: any } = {
      '/api/tasks/pirgnojgn': task,
      '/api/categories': categories,
    };

    return {
      data: mockData?.[key as string],
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
