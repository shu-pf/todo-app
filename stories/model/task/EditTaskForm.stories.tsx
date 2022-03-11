import { ComponentStory, ComponentMeta } from '@storybook/react';
import { rest } from 'msw';
import React from 'react';
import { Middleware, SWRConfig, SWRResponse } from 'swr';

import { EditTaskForm } from '../../../components/model/task/EditTaskForm';

const meta: ComponentMeta<typeof EditTaskForm> = {
  component: EditTaskForm,
};

export default meta;

const Template: ComponentStory<typeof EditTaskForm> = (args) => <EditTaskForm {...args} />;

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
    let path;
    if (key && typeof key === 'object') {
      path = key[0];
    }
    const mockData: { [name: string]: any } = {
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
    handlers: [
      rest.patch(`${process.env.NEXT_PUBLIC_API_ORIGIN}/api/taskspirgnojgn`, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            id: 'aJDm3esbPPlGLKseXPXp',
            title: 'お米を買う',
            category: '買い物リスト',
            limit: '2020/5/4',
            detail: '次はあきたこまちがいいかもしれない',
            created_at: '2020-03-28T07:55:21.109Z',
          })
        );
      }),
    ],
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
    handlers: [
      rest.patch(`${process.env.NEXT_PUBLIC_API_ORIGIN}/api/taskspirgnojgn`, (req, res, ctx) => {
        return res(
          ctx.status(401),
          ctx.json({
            error: 'Unauthorized',
          })
        );
      }),
    ],
  },
};
