import { mutate } from 'swr';

import { authenticatedFetcher } from '../../libs/fetchers';

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
  await authenticatedFetcher<ResponseData, RequestData>('/api/categories', token, 'POST', { name });

  mutate('/api/categories');
};
