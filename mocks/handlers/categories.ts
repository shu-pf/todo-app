import { rest } from 'msw';

export const successUpdateCategoryHeader = rest.patch(
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

export const successCreateCategoryHeader = rest.post(
  `${process.env.NEXT_PUBLIC_API_ORIGIN}/api/categories`,
  (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 'HebkGmfqSMHImF6ObgrP',
        name: '買い物リスト',
      })
    );
  }
);
