import { ComponentStory, ComponentMeta } from '@storybook/react';
import { rest } from 'msw';
import { Middleware, SWRConfig, SWRResponse } from 'swr';

import { TaskList } from '../../../components/model/task/TaskList';

const meta: ComponentMeta<typeof TaskList> = {
  component: TaskList,
};

export default meta;

const Template: ComponentStory<typeof TaskList> = (args) => <TaskList {...args} />;

const tasks = [
  {
    id: 'aJDm3esbPPlGLKseXPXp',
    title: '{"title":"お米を買う","checked":false,"detail":"次はあきたこまちがいいかもしれない"}',
    category: '買い物リスト',
    limit: '2020-5-4',
    created_at: '2020-03-28T07:55:21.109Z',
  },
  {
    id: 'zRTxMgbCsPCKsbUyU5cg',
    title:
      '{"title":"高沼プロジェクトを終わらせる","checked":false,"detail":"次はあきたこまちがいいかもしれない"}',
    category: 'Work',
    limit: '2020-6-11',
    created_at: '2020-03-27T08:20:11.109Z',
  },
  {
    id: 'zRTxMgbCsPCKsbUyU5c1',
    title:
      '{"title":"GraphQLについて勉強する","checked":true,"detail":"次はあきたこまちがいいかもしれない"}',
    category: 'GraphQL',
    limit: '2020-7-15',
    created_at: '2020-03-26T08:20:11.109Z',
  },
  {
    id: 'zRTxMgbCsPCKsbUyU5c2',
    title:
      '{"title":"ESLintについて勉強する","checked":true,"detail":"次はあきたこまちがいいかもしれない"}',
    category: 'Work',
    limit: '2020-8-23',
    created_at: '2020-03-25T08:20:11.109Z',
  },
];

const task = {
  title: '{"title":"お米を買う","checked":false,"detail":"次はあきたこまちがいいかもしれない"}',
  category: '買い物リスト',
  limit: '2022-03-05',
  detail: '',
};

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

const middleware: Middleware = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (key): SWRResponse<any, any> => {
    let path;
    if (key && typeof key === 'object') {
      path = key[0];
    }
    const mockData: { [name: string]: unknown } = {
      '/api/tasks/aJDm3esbPPlGLKseXPXp': task,
      '/api/tasks': tasks,
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

const successDeleteHandler = rest.delete(
  `${process.env.NEXT_PUBLIC_API_ORIGIN}/api/tasks/*`,
  (req, res, ctx) => {
    return res(
      ctx.json({
        message: 'Successfully deleted task.',
      })
    );
  }
);

const successUpdateHandler = rest.patch(
  `${process.env.NEXT_PUBLIC_API_ORIGIN}/api/tasks/*`,
  (req, res, ctx) => {
    return res(
      ctx.json({
        title:
          '{"title":"高沼プロジェクトを終わらせる","checked":false,"detail":"次はあきたこまちがいいかもしれない"}',
        category: '買い物リスト',
        limit: '2020/5/4',
        detail: '',
      })
    );
  }
);

const successTaskAddHandler = rest.post(
  `${process.env.NEXT_PUBLIC_API_ORIGIN}/api/tasks`,
  (req, res, ctx) => {
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
  }
);

export const AllCategories = Template.bind({});
AllCategories.args = {
  category: '',
};
AllCategories.decorators = [
  (story) => <SWRConfig value={{ use: [middleware] }}>{story()}</SWRConfig>,
];
AllCategories.parameters = {
  msw: {
    handlers: [successDeleteHandler, successUpdateHandler, successTaskAddHandler],
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
    handlers: [successDeleteHandler, successUpdateHandler],
  },
};
