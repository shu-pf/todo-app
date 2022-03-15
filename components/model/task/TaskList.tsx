/** @jsxImportSource @emotion/react */
import { css, Theme, useTheme } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { deleteTask, updateTask } from '../../../data/actions';
import { AfterParseTasks, useTaskList } from '../../../data/hooks/task';
import { HttpError } from '../../../data/libs/fetchers';
import { userTokenState } from '../../../states';
import { ModalProvider } from '../../provider/ModalProvider';
import { Icon } from '../../ui/data-display/Icon';
import { Task } from '../../ui/data-display/Task';
import { ToolTip, Option } from '../../ui/data-display/ToolTip';
import { Spinner } from '../../ui/feedback/Spinner';
import { Button } from '../../ui/input/Button';
import { Alert } from '../../ui/utils/Alert';

import { AddTaskForm } from './AddTaskForm';
import { EditTaskForm } from './EditTaskForm';

interface TaskListProps {
  category: string;
}

export const TaskList = ({ category }: TaskListProps) => {
  const [sortOption, setSortOption] = useState<Option>({ key: 'limit', value: 'Limit' });
  const { tasks, isLoading } = useTaskList(sortOption.key);

  const theme = useTheme();
  const userToken = useRecoilValue(userTokenState);

  const [sortOptionsDisplay, setSortOptionsDisplay] = useState(false);

  const [categoryTasks, setCategoryTasks] = useState<AfterParseTasks>([]);

  const [editModalState, setEditModalState] = useState({ taskId: '' });
  const [addModalState, setAddModalState] = useState(false);
  const [alertModalState, setAlertModalState] = useState({ taskId: '' });

  useEffect(() => {
    if (!tasks) {
      return;
    }

    const filtered = category ? tasks.filter((task) => task.category === category) : tasks;

    setCategoryTasks(filtered);
  }, [category, tasks]);

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
    { key: 'limit', value: 'Limit' },
    { key: 'created_at', value: 'Created At' },
    { key: 'category', value: 'Categories' },
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
        <Button label="Add Task" size="small" icon="Add" onClick={() => setAddModalState(true)} />
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
        categoryTasks.map((task) => (
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
              onDelete={() => setAlertModalState({ taskId: task.id })}
              onEdit={() => setEditModalState({ taskId: task.id })}
              onCheck={() => onCheck(task)}
            />
          </div>
        ))
      )}
      {editModalState.taskId && (
        <ModalProvider position="right" onClick={() => setEditModalState({ taskId: '' })}>
          <EditTaskForm
            taskId={editModalState.taskId}
            onCancel={() => setEditModalState({ taskId: '' })}
            onSubmitted={() => setEditModalState({ taskId: '' })}
          />
        </ModalProvider>
      )}
      {addModalState && (
        <ModalProvider position="right" onClick={() => setAddModalState(false)}>
          <AddTaskForm
            onCancel={() => setAddModalState(false)}
            onSubmitted={() => setAddModalState(false)}
          />
        </ModalProvider>
      )}
      {alertModalState.taskId && (
        <ModalProvider position="center" onClick={() => setAlertModalState({ taskId: '' })}>
          <Alert
            message="この操作は取り消し出来ません。タスク「高沼カリキュラムをおわらせる」を削除します。"
            onCancel={() => setAlertModalState({ taskId: '' })}
            onSuccess={async () => {
              await onDelete(alertModalState.taskId);
              setAlertModalState({ taskId: '' });
            }}
          />
        </ModalProvider>
      )}
    </>
  );
};
