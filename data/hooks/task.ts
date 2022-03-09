import { useRecoilValue } from 'recoil';
import useSWR from 'swr';

import { userTokenState } from '../../states';
import { getAuthenticatedFetcher } from '../libs/fetchers';
import { titleDeserializer } from '../libs/title-serializer';

type BeforeParseTasks = Array<{
  id: string;
  title: string;
  category: string;
  limit: string;
  created_at: string;
}>;

interface BeforeParseTask {
  title: string;
  category: string;
  limit: string;
  detail: string;
}

function parseTasks(tasks: BeforeParseTasks) {
  return tasks?.map((task) => {
    const { title, checked } = titleDeserializer(task.title);
    return {
      id: task.id,
      title,
      checked,
      category: task.category,
      limit: task.limit,
      created_at: new Date(task.created_at),
    };
  });
}

export const useTaskList = () => {
  const userToken = useRecoilValue(userTokenState);

  const { data, error } = useSWR(
    '/api/tasks',
    getAuthenticatedFetcher<BeforeParseTasks>(userToken)
  );

  return {
    tasks: data && parseTasks(data),
    isLoading: !error && !data,
    isError: error,
  };
};

function parseTask(task: BeforeParseTask) {
  const { title, checked } = titleDeserializer(task.title);

  return {
    title,
    checked,
    category: task.category,
    limit: task.limit,
    detail: task.detail,
  };
}

export const useTask = (taskId: string) => {
  const userToken = useRecoilValue(userTokenState);

  const { data, error } = useSWR(
    [`/api/tasks/${taskId}`, userToken],
    getAuthenticatedFetcher<BeforeParseTask>(userToken)
  );

  return {
    task: data && parseTask(data),
    isLoading: !error && !data,
    isError: error,
  };
};
