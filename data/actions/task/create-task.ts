import { mutate } from 'swr';

import { authenticatedFetcher } from '../../libs/fetchers';
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

interface RequestData {
  title: string;
  category: string;
  limit: string;
  detail: string;
}

interface ResponseData {
  id: string;
  title: string;
  category: string;
  limit: string;
  detail: string;
  created_at: string;
}

export const createTask = async ({ token, task }: Params) => {
  const requestData: RequestData = {
    title: titleSerializer({ title: task.title, checked: task.checked }),
    category: task.category,
    limit: task.limit,
    detail: task.detail,
  };

  await authenticatedFetcher<ResponseData, RequestData>('/api/tasks', token, 'POST', requestData);

  mutate('/api/tasks');
};
