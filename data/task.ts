import useSWR from 'swr';

export interface BeforeParseTask {
  id: string;
  title: string;
  category: string;
  limit: string;
  created_at: string;
}

export const useTaskList = () => {
  const { data: beforeParseTasks, error } = useSWR<BeforeParseTask[]>('/api/tasks');

  const tasks = beforeParseTasks?.map((beforeParseTask) => {
    const { title, checked }: { title: string; checked: boolean } = JSON.parse(
      beforeParseTask.title
    );
    return {
      id: beforeParseTask.id,
      title,
      checked,
      category: beforeParseTask.category,
      limit: beforeParseTask.limit,
      created_at: new Date(beforeParseTask.created_at),
    };
  });

  return {
    tasks,
    isLoading: !error && !tasks,
    isError: error,
  };
};
