import { mutate } from 'swr';

import { authenticatedFetcher } from '../../libs/fetchers';

interface Params {
  token: string;
  taskId: string;
}

export const deleteTask = async ({ token, taskId }: Params) => {
  await authenticatedFetcher(`/api/tasks/${taskId}`, token, 'DELETE');

  mutate(['/api/tasks', token]);
  mutate(['/api/tasks?sort=limit', token]);
  mutate(['/api/tasks?sort=created_at', token]);
  mutate(['/api/tasks?sort=category', token]);
};
