import { mutate } from 'swr';

import { getAuthenticatedFetcher } from '../../libs/fetchers';

interface Params {
  name: string;
  token: string;
}

interface RequestData {
  name: string;
}

interface ResponseData {
  id: string;
  name: string;
}

export const createCategory = async ({ name, token }: Params) => {
  const fetcher = getAuthenticatedFetcher<RequestData, ResponseData>(token);

  await fetcher('/api/categories', 'POST', { name });

  mutate('/api/categories');
};
