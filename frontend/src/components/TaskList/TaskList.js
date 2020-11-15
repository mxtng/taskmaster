import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import TaskItem from '../TaskItem/TaskItem';
import Loader from '../Loader/Loader';
import Alert from '../Alert/Alert';
import { GET_TASKS } from '../../apollo/queries';

const TaskList = () => {
  const {
    loading,
    error,
    data,
  } = useQuery(GET_TASKS);
  const [state, setState] = useState(false);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setState(true);
    }

    return () => {
      mounted = false;
      setState(false);
    };
  }, []);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <Alert alertMsg='Error: Unable to load task list' />;
  }

  return data.tasks.map((task) => <TaskItem key={task.id} task={task} />);
};

export default TaskList;
