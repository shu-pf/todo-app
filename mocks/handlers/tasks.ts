import { rest } from 'msw';

export const successCreateTaskHeader = rest.post(
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

export const errorCreateTaskHeader = rest.post(
  `${process.env.NEXT_PUBLIC_API_ORIGIN}/api/tasks`,
  (req, res, ctx) => {
    return res(
      ctx.status(401),
      ctx.json({
        error: 'Unauthorized',
      })
    );
  }
);

export const successUpdateTaskHeader = rest.patch(
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

export const errorUpdateTaskHeader = rest.patch(
  `${process.env.NEXT_PUBLIC_API_ORIGIN}/api/taskspirgnojgn`,
  (req, res, ctx) => {
    return res(
      ctx.status(401),
      ctx.json({
        error: 'Unauthorized',
      })
    );
  }
);

export const successDeleteTaskHandler = rest.delete(
  `${process.env.NEXT_PUBLIC_API_ORIGIN}/api/tasks/*`,
  (req, res, ctx) => {
    return res(
      ctx.json({
        message: 'Successfully deleted task.',
      })
    );
  }
);
