import { mutate } from 'swr';

import { authenticatedFetcher } from '../../libs/fetchers';

interface Params {
  categoryId: string;
  name: string;
  token: string;
}

interface RequestData {
  name: string;
}

interface ResponseData {
  name: string;
}

export const updateCategory = async ({ categoryId, token, name }: Params) => {
  await authenticatedFetcher<ResponseData, RequestData>(
    `/api/categories/${categoryId}`,
    token,
    'PATCH',
    { name }
  );

  mutate('/api/categories');
};
