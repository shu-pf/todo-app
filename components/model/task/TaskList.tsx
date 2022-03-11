/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import { useRecoilValue } from 'recoil';

import { deleteTask, updateTask } from '../../../data/actions';
import { useTaskList } from '../../../data/hooks';
import { HttpError } from '../../../data/libs/fetchers';
import { userTokenState } from '../../../states';
import { Task } from '../../ui/data-display/Task';
import { Spinner } from '../../ui/feedback/Spinner';

interface TaskListProps {
  category: string;
  onEdit: ({ taskId }: { taskId: string }) => void;
}

export const TaskList = ({ category, onEdit }: TaskListProps) => {
  const { tasks, isLoading } = useTaskList();
  const theme = useTheme();
  const userToken = useRecoilValue(userTokenState);

  const filteredTasks = tasks
    ? tasks.filter(function (task) {
        return task.category === category;
      })
    : [];

  const onDelete = async (taskId: string) => {
    try {
      await deleteTask({ taskId, token: userToken });
    } catch (e) {
      if (e instanceof HttpError) {
        window.alert('削除に失敗しました。Error Message: ' + e.data.error);
        return;
      }
      throw e;
    }
  };

  const onCheck = async (task: {
    id: string;
    title: string;
    checked: boolean;
    category: string;
    limit: string;
    detail: string;
    created_at: Date;
  }) => {
    try {
      await updateTask({
        token: userToken,
        task: {
          title: task.title,
          checked: !task.checked,
          category: task.category,
          limit: task.limit,
          detail: task.detail,
        },
        taskId: task.id,
      });
    } catch (e) {
      if (e instanceof HttpError) {
        window.alert('更新に失敗しました。Error Message: ' + e.data.error);
        return;
      }
      throw e;
    }
  };

  if (isLoading) {
    return (
      <div
        css={css`
          display: flex;
          justify-content: center;
        `}
      >
        <Spinner color={theme.colors.primary.green}></Spinner>
      </div>
    );
  }

  return (
    <>
      {category
        ? filteredTasks?.map((task) => (
            <div
              key={task.id}
              css={css`
                margin-bottom: 24px;
              `}
            >
              <Task
                title={task.title}
                checked={task.checked}
                category={task.category}
                limit={task.limit}
                onDelete={() => onDelete(task.id)}
                onEdit={() => onEdit({ taskId: task.id })}
                onCheck={() => onCheck(task)}
              />
            </div>
          ))
        : tasks?.map((task) => (
            <div
              key={task.id}
              css={css`
                margin-bottom: 24px;
              `}
            >
              <Task
                title={task.title}
                checked={task.checked}
                category={task.category}
                limit={task.limit}
                onDelete={() => onDelete(task.id)}
                onEdit={() => onEdit({ taskId: task.id })}
                onCheck={() => onCheck(task)}
              />
            </div>
          ))}
    </>
  );
};
