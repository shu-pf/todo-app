import { mutate } from 'swr';

import { getAuthenticatedFetcher } from '../../libs/fetchers';

interface Params {
  token: string;
  taskId: string;
}

export const deleteTask = async ({ token, taskId }: Params) => {
  const fetcher = getAuthenticatedFetcher(token);

  await fetcher(`/api/tasks/${taskId}`, {
    method: 'delete',
  });

  mutate('/api/tasks');
};
