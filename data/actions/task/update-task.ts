import { mutate } from 'swr';

import { getAuthenticatedFetcher } from '../../libs/fetchers';
import { titleSerializer } from '../../libs/title-serializer';

interface Params {
  token: string;
  taskId: string;
  task: {
    title: string;
    checked: boolean;
    category: string;
    limit: string;
    detail: string;
  };
}

interface ResponseData {
  title: string;
  category: string;
  limit: string;
  detail: string;
}

export const updateTask = async ({ token, task, taskId }: Params) => {
  const fetcher = getAuthenticatedFetcher(token);

  const responseData = (await fetcher(`/api/tasks${taskId}`, {
    method: 'patch',
    body: JSON.stringify({
      title: titleSerializer({ title: task.title, checked: task.checked }),
      category: task.category,
      limit: task.limit,
      detail: task.detail,
    }),
  })) as ResponseData;

  mutate('/api/tasks');
  mutate(`/api/tasks/${taskId}`, responseData, false);
};