import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Middleware, SWRConfig, SWRResponse } from 'swr';

import { TaskList } from '../../../components/model/task/TaskList';
import {
  categories,
  task,
  tasksSortWithCategory,
  tasksSortWithCreatedAt,
  tasksSortWithLimit,
} from '../../../mocks/data';
import {
  successDeleteTaskHandler,
  successTaskAddHandler,
  successUpdateTaskHandler,
} from '../../../mocks/handlers';

const meta: ComponentMeta<typeof TaskList> = {
  component: TaskList,
};

export default meta;

const Template: ComponentStory<typeof TaskList> = (args) => <TaskList {...args} />;

const middleware: Middleware = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (key): SWRResponse<any, any> => {
    let path;
    if (key && typeof key === 'object') {
      path = key[0];
    }
    const mockData: { [name: string]: unknown } = {
      '/api/tasks/aJDm3esbPPlGLKseXPXp': task,
      '/api/tasks?sort=created_at': tasksSortWithCreatedAt,
      '/api/tasks?sort=category': tasksSortWithCategory,
      '/api/tasks?sort=limit': tasksSortWithLimit,
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

const loadingMiddleware: Middleware = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (): SWRResponse<any, any> => {
    return {
      data: undefined,
      error: undefined,
      mutate: () => Promise.resolve(),
      isValidating: false,
    };
  };
};

export const AllCategories = Template.bind({});
AllCategories.args = {
  category: '',
};
AllCategories.decorators = [
  (story) => <SWRConfig value={{ use: [middleware] }}>{story()}</SWRConfig>,
];
AllCategories.parameters = {
  msw: {
    handlers: [successDeleteTaskHandler, successUpdateTaskHandler, successTaskAddHandler],
  },
};

export const Loading = Template.bind({});
Loading.args = {
  category: '',
};
Loading.decorators = [
  (story) => <SWRConfig value={{ use: [loadingMiddleware] }}>{story()}</SWRConfig>,
];

export const SelectCategory = Template.bind({});
SelectCategory.args = {
  category: 'Work',
};
SelectCategory.decorators = [
  (story) => <SWRConfig value={{ use: [middleware] }}>{story()}</SWRConfig>,
];
SelectCategory.parameters = {
  msw: {
    handlers: [successDeleteTaskHandler, successUpdateTaskHandler],
  },
};
