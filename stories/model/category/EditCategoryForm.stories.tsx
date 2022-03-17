import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Middleware, SWRConfig, SWRResponse } from 'swr';

import { EditCategoryForm } from '../../../components/model/category/EditCategoryForm';
import { categories } from '../../../mocks/data';
import { updateCategoryHeader } from '../../../mocks/handlers';

const meta: ComponentMeta<typeof EditCategoryForm> = {
  component: EditCategoryForm,
};

export default meta;

const Template: ComponentStory<typeof EditCategoryForm> = (args) => <EditCategoryForm {...args} />;

const middleware: Middleware = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (key): SWRResponse<any, any> => {
    let path;
    if (key && typeof key === 'object') {
      path = key[0];
    }
    const mockData: { [name: string]: unknown } = {
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
  categoryId: 'oeijfeowijfwoeijk',
};
Default.decorators = [(story) => <SWRConfig value={{ use: [middleware] }}>{story()}</SWRConfig>];
Default.parameters = {
  msw: {
    handlers: [updateCategoryHeader],
  },
};

export const Loading = Template.bind({});
Loading.args = {
  categoryId: 'oeijfeowijfwoeijk',
};
Loading.decorators = [
  (story) => <SWRConfig value={{ use: [loadingMiddleware] }}>{story()}</SWRConfig>,
];
