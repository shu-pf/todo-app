import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Middleware, SWRResponse, SWRConfig } from 'swr';

import { IndexPage } from '../../components/page/index';

const meta: ComponentMeta<typeof IndexPage> = {
  component: IndexPage,
};

export default meta;

const Template: ComponentStory<typeof IndexPage> = () => <IndexPage />;

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
] as const;

const tasksSortWithCategory = [tasks[2], tasks[1], tasks[3], tasks[0]];
const tasksSortWithCreatedAt = [tasks[3], tasks[2], tasks[1], tasks[0]];
const tasksSortWithLimit = [tasks[0], tasks[1], tasks[2], tasks[3]];

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
