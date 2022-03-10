import { mutate } from 'swr';

import { authenticatedFetcher } from '../../libs/fetchers';

interface Params {
  token: string;
  taskId: string;
}

export const deleteTask = async ({ token, taskId }: Params) => {
  await authenticatedFetcher(`/api/tasks/${taskId}`, token, 'DELETE');

  mutate('/api/tasks');
};
