import { mutate } from 'swr';

import { getAuthenticatedFetcher } from '../../libs/fetchers';

interface Params {
  name: string;
  token: string;
}

export const createCategory = async ({ name, token }: Params) => {
  const fetcher = getAuthenticatedFetcher(token);

  await fetcher('/api/categories', {
    method: 'post',
    body: JSON.stringify({ name }),
  });

  mutate('/api/categories');
};
