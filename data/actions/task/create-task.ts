import { mutate } from 'swr';

import { getAuthenticatedFetcher } from '../../libs/fetchers';
import { titleSerializer } from '../../libs/title-serializer';

interface Params {
  token: string;
  task: {
    title: string;
    checked: boolean;
    category: string;
    limit: string;
    detail: string;
  };
}

export const createTask = async ({ token, task }: Params) => {
  const fetcher = getAuthenticatedFetcher(token);

  await fetcher('/api/tasks', {
    method: 'post',
    body: JSON.stringify({
      title: titleSerializer({ title: task.title, checked: task.checked }),
      category: task.category,
      limit: task.limit,
      detail: task.detail,
    }),
  });

  mutate('/api/tasks');
};
