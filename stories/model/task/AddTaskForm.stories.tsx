import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Middleware, SWRConfig, SWRResponse } from 'swr';

import { AddTaskForm } from '../../../components/model/task/AddTaskForm';
import { categories } from '../../../mocks/data';
import { errorCreateTaskHeader, successCreateTaskHeader } from '../../../mocks/handlers';

const meta: ComponentMeta<typeof AddTaskForm> = {
  component: AddTaskForm,
};

export default meta;

const Template: ComponentStory<typeof AddTaskForm> = (args) => <AddTaskForm {...args} />;

const categoryMiddleware: Middleware = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (): SWRResponse<any, any> => {
    return {
      data: categories,
      error: undefined,
      mutate: () => Promise.resolve(),
      isValidating: false,
    };
  };
};

export const Default = Template.bind({});
Default.decorators = [
  (story) => <SWRConfig value={{ use: [categoryMiddleware] }}>{story()}</SWRConfig>,
];
Default.parameters = {
  msw: {
    handlers: [successCreateTaskHeader],
  },
};

export const HttpError = Template.bind({});
HttpError.decorators = [
  (story) => <SWRConfig value={{ use: [categoryMiddleware] }}>{story()}</SWRConfig>,
];
HttpError.parameters = {
  msw: {
    handlers: [errorCreateTaskHeader],
  },
};
