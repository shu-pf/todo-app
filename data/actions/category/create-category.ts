import { mutate } from 'swr';

import { getAuthenticatedFetcher } from '../../libs/fetchers';

interface Params {
  name: string;
  token: string;
}

interface RequestData {
  name: string;
}

export const createCategory = async ({ name, token }: Params) => {
  const fetcher = getAuthenticatedFetcher(token);

  const requestData: RequestData = { name };

  await fetcher('/api/categories', {
    method: 'post',
    body: JSON.stringify(requestData),
  });

  mutate('/api/categories');
};
