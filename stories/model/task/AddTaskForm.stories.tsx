import { ComponentStory, ComponentMeta } from '@storybook/react';
import { rest } from 'msw';
import React from 'react';
import { Middleware, SWRConfig, SWRResponse } from 'swr';

import { AddTaskForm } from '../../../components/model/task/AddTaskForm';

const meta: ComponentMeta<typeof AddTaskForm> = {
  component: AddTaskForm,
};

export default meta;

const Template: ComponentStory<typeof AddTaskForm> = (args) => <AddTaskForm {...args} />;

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
    handlers: [
      rest.post(`${process.env.NEXT_PUBLIC_API_ORIGIN}/api/tasks`, (req, res, ctx) => {
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

export const HttpError = Template.bind({});
HttpError.decorators = [
  (story) => <SWRConfig value={{ use: [categoryMiddleware] }}>{story()}</SWRConfig>,
];
HttpError.parameters = {
  msw: {
    handlers: [
      rest.post(`${process.env.NEXT_PUBLIC_API_ORIGIN}/api/tasks`, (req, res, ctx) => {
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
