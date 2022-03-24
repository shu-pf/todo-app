import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Middleware, SWRConfig, SWRResponse } from 'swr';

import { EditTaskForm } from '../../../components/model/task/EditTaskForm';
import { categories } from '../../../mocks/data';
import { task } from '../../../mocks/data/tasks';
import { errorUpdateTaskHeader, successUpdateTaskHeader } from '../../../mocks/handlers';

const meta: ComponentMeta<typeof EditTaskForm> = {
  component: EditTaskForm,
};

export default meta;

const Template: ComponentStory<typeof EditTaskForm> = (args) => <EditTaskForm {...args} />;

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

export const Default = Template.bind({});
Default.args = {
  taskId: 'pirgnojgn',
};
Default.decorators = [(story) => <SWRConfig value={{ use: [middleware] }}>{story()}</SWRConfig>];
Default.parameters = {
  msw: {
    handlers: [successUpdateTaskHeader],
  },
};

export const Loading = Template.bind({});
Loading.args = {
  taskId: 'pirgnojgn',
};
Loading.decorators = [
  (story) => <SWRConfig value={{ use: [loadingMiddleware] }}>{story()}</SWRConfig>,
];

export const HttpError = Template.bind({});
HttpError.args = {
  taskId: 'pirgnojgn',
};
HttpError.decorators = [(story) => <SWRConfig value={{ use: [middleware] }}>{story()}</SWRConfig>];
HttpError.parameters = {
  msw: {
    handlers: [errorUpdateTaskHeader],
  },
};
