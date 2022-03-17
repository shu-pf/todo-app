import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Middleware, SWRResponse, SWRConfig } from 'swr';

import { IndexPage } from '../../components/page/index';
import {
  tasksSortWithCreatedAt,
  tasksSortWithCategory,
  tasksSortWithLimit,
  categories,
} from '../../mocks/data';

const meta: ComponentMeta<typeof IndexPage> = {
  component: IndexPage,
};

export default meta;

const Template: ComponentStory<typeof IndexPage> = () => <IndexPage />;

const middleware: Middleware = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (key): SWRResponse<any, any> => {
    let path;
    if (key && typeof key === 'object') {
      path = key[0];
    }
    const mockData: { [name: string]: unknown } = {
      '/api/categories': categories,
      '/api/tasks?sort=created_at': tasksSortWithCreatedAt,
      '/api/tasks?sort=category': tasksSortWithCategory,
      '/api/tasks?sort=limit': tasksSortWithLimit,
    };

    return {
      data: mockData?.[path],
      error: undefined,
      mutate: () => Promise.resolve(),
      isValidating: false,
    };
  };
};

export const Default = Template.bind({});
Default.decorators = [(story) => <SWRConfig value={{ use: [middleware] }}>{story()}</SWRConfig>];
