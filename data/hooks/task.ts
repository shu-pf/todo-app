import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import useSWR from 'swr';

import { userTokenState } from '../../states';
import { authenticatedFetcher } from '../libs/fetchers';
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

export type AfterParseTasks = Array<{
  id: string;
  title: string;
  checked: boolean;
  category: string;
  limit: string;
  detail: string;
  created_at: Date;
}>;

function parseTasks(tasks: BeforeParseTasks): AfterParseTasks {
  return tasks?.map((task) => {
    const { title, checked, detail } = titleDeserializer(task.title);
    return {
      id: task.id,
      title,
      checked,
      category: task.category,
      limit: task.limit,
      detail,
      created_at: new Date(task.created_at),
    };
  });
}

export const useTaskList = () => {
  const userToken = useRecoilValue(userTokenState);

  const { data, error } = useSWR<BeforeParseTasks>(['/api/tasks', userToken], authenticatedFetcher);
  const parsedTasks = useMemo(() => data && parseTasks(data), [data]);

  return {
    tasks: parsedTasks,
    isLoading: !error && !data,
    isError: error,
  };
};

function parseTask(task: BeforeParseTask) {
  const { title, checked, detail } = titleDeserializer(task.title);

  return {
    title,
    checked,
    category: task.category,
    limit: task.limit,
    detail,
  };
}

export const useTask = (taskId: string) => {
  const userToken = useRecoilValue(userTokenState);

  const { data, error } = useSWR<BeforeParseTask>(
    [`/api/tasks/${taskId}`, userToken],
    authenticatedFetcher
  );

  return {
    task: data && parseTask(data),
    isLoading: !error && !data,
    isError: error,
  };
};
