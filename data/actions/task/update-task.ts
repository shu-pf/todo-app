import { mutate } from 'swr';

import { authenticatedFetcher } from '../../libs/fetchers';
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

interface RequestData {
  title: string;
  category: string;
  limit: string;
  detail: string;
}

export const updateTask = async ({ token, task, taskId }: Params) => {
  const requestData = {
    title: titleSerializer({ title: task.title, checked: task.checked, detail: task.detail }),
    category: task.category,
    limit: task.limit,
    detail: '',
  };

  const responseData = await authenticatedFetcher<ResponseData, RequestData>(
    `/api/tasks/${taskId}`,
    token,
    'PATCH',
    requestData
  );

  mutate('/api/tasks');
  mutate(`/api/tasks/${taskId}`, responseData, false);
};
