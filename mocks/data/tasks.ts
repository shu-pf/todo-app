export const task = {
  title: '{"title":"お米を買う","checked":false,"detail":"次はあきたこまちがいいかもしれない"}',
  category: '買い物リスト',
  limit: '2022-03-05',
  detail: '',
};

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

export const tasksSortWithCategory = [tasks[2], tasks[1], tasks[3], tasks[0]];
export const tasksSortWithCreatedAt = [tasks[3], tasks[2], tasks[1], tasks[0]];
export const tasksSortWithLimit = [tasks[0], tasks[1], tasks[2], tasks[3]];
