import React from 'react';
import Heading from '../../components/Heading/Heading';
import TaskList from '../../components/TaskList/TaskList';

import './TasksPage.css';

const TasksPage = () => {
  return (
    <div className='tasks'>
      <Heading title='Task List' />
      <TaskList />
    </div>
  );
};

export default TasksPage;
