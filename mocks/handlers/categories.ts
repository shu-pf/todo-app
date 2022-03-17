import { rest } from 'msw';

export const updateCategoryHeader = rest.patch(
  `${process.env.NEXT_PUBLIC_API_ORIGIN}/api/categories/oeijfeowijfwoeijk`,
  (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        name: '買い物リスト',
      })
    );
  }
);
