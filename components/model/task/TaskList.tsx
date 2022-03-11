/** @jsxImportSource @emotion/react */
import { css, Theme, useTheme } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { deleteTask, updateTask } from '../../../data/actions';
import { AfterParseTasks, useTaskList } from '../../../data/hooks/task';
import { HttpError } from '../../../data/libs/fetchers';
import { userTokenState } from '../../../states';
import { Icon } from '../../ui/data-display/Icon';
import { Task } from '../../ui/data-display/Task';
import { ToolTip, Option } from '../../ui/data-display/ToolTip';
import { Spinner } from '../../ui/feedback/Spinner';
import { Button } from '../../ui/input/Button';

interface TaskListProps {
  category: string;
  onEdit: ({ taskId }: { taskId: string }) => void;
}

export const TaskList = ({ category, onEdit }: TaskListProps) => {
  const { tasks, isLoading } = useTaskList();

  const theme = useTheme();
  const userToken = useRecoilValue(userTokenState);

  const [sortOptionsDisplay, setSortOptionsDisplay] = useState(false);
  const [sortOption, setSortOption] = useState<Option>({ key: 'Limit', value: 'Limit' });

  const [sortedTasks, setSortedTasks] = useState<AfterParseTasks>([]);

  useEffect(() => {
    if (!tasks) {
      return;
    }

    const filtered = category ? tasks.filter((task) => task.category === category) : tasks;

    const sortByLimit = () => {
      const sorted = [...filtered].sort((a, b) => {
        const aDate = new Date(a.limit);
        const bDate = new Date(b.limit);
        if (aDate.getTime() < bDate.getTime()) return -1;
        if (aDate.getTime() > bDate.getTime()) return 1;
        else return 0;
      });
      setSortedTasks(sorted);
    };

    const sortByCreatedAt = () => {
      const sorted = [...filtered].sort((a, b) => {
        if (a.created_at.getTime() < b.created_at.getTime()) return -1;
        if (a.created_at.getTime() > b.created_at.getTime()) return 1;
        else return 0;
      });
      setSortedTasks(sorted);
    };

    const sortByCategories = () => {
      const sorted = [...filtered].sort((a, b) => {
        return a.category.localeCompare(b.category);
      });
      setSortedTasks(sorted);
    };

    if (sortOption.key == 'CreatedAt') {
      sortByCreatedAt();
    } else if (sortOption.key == 'Categories') {
      sortByCategories();
    } else {
      sortByLimit();
    }
  }, [category, sortOption, tasks]);

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

  const options = [
    { key: 'Limit', value: 'Limit' },
    { key: 'CreatedAt', value: 'Created At' },
    { key: 'Categories', value: 'Categories' },
  ];

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

  return (
    <>
      {/* Header */}
      <div
        css={css`
          display: flex;
          align-items: flex-end;
          margin-bottom: 12px;
        `}
      >
        <h2
          css={css`
            margin-right: 20px;
          `}
        >
          Tasks
        </h2>
        <div
          css={css`
            display: flex;
            flex-grow: 1;
          `}
        >
          <span
            css={(theme: Theme) => css`
              font-weight: 300;
              color: ${theme.colors.text.gray};
              margin-right: 4px;
            `}
          >
            Sort By
          </span>
          <div
            css={css`
              cursor: pointer;
              position: relative;
            `}
            onClick={() => setSortOptionsDisplay(!sortOptionsDisplay)}
          >
            {sortOptionsDisplay && (
              <div
                css={css`
                  position: absolute;
                  right: 0;
                  top: calc(100% + 6px);
                  z-index: 1;
                `}
              >
                <ToolTip options={options} onClick={(option) => setSortOption(option)}></ToolTip>
              </div>
            )}
            <span
              css={(theme: Theme) =>
                css`
                  font-weight: bold;
                  color: ${theme.colors.text.gray};
                  margin-right: 4px;
                `
              }
            >
              {sortOption.value}
            </span>
            <Icon name="ExpandMoreSmall" />
          </div>
        </div>
        <Button label="Add Task" size="small" icon="Add"></Button>
      </div>
      {/* Body */}
      {isLoading ? (
        <div
          css={css`
            display: flex;
            justify-content: center;
          `}
        >
          <Spinner color={theme.colors.primary.green}></Spinner>
        </div>
      ) : (
        sortedTasks.map((task) => (
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
      )}
    </>
  );
};
