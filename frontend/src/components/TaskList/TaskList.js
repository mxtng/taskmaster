import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import TaskItem from '../TaskItem/TaskItem';
import Loader from '../Loader/Loader';
import Alert from '../Alert/Alert';
import { GET_TASKS, GET_USER_TASKS } from '../../apollo/queries';

const TaskList = ({ userId }) => {
  const [isMounted, setIsMounted] = useState(true);

  const [
    getTasks,
    { loading: loading_tasks, error: error_tasks, data: data_tasks },
  ] = useLazyQuery(GET_TASKS, {
    skip: userId,
  });

  const [
    getUserTasks,
    {
      loading: loading_userTasks,
      error: error_userTasks,
      data: data_userTasks,
    },
  ] = useLazyQuery(GET_USER_TASKS, {
    skip: !userId,
    variables: { userId },
  });

  useEffect(() => {
    if (isMounted) {
      userId ? getUserTasks() : getTasks();
    }

    return () => {
      setIsMounted(false);
    };
  }, [isMounted, userId, getUserTasks, getTasks]);

  if (loading_tasks || loading_userTasks) {
    return <Loader />;
  }
  if (error_tasks || error_userTasks) {
    return <Alert alertMsg='Error: Unable to load task list' />;
  }

  if (userId) {
    return data_userTasks && data_userTasks.getUser.tasks
      ? data_userTasks.getUser.tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))
      : 'No User Task Found';
  }
  return data_tasks && data_tasks.tasks
    ? data_tasks.tasks.map((task) => <TaskItem key={task.id} task={task} />)
    : 'No Task Found';
};

export default TaskList;
