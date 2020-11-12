import React, { Fragment, useState } from 'react';
import { useQuery } from '@apollo/client';
import Heading from '../../components/Heading/Heading';
import TaskItem from '../../components/TaskItem/TaskItem';
import Modal from '../../components/Modal/Modal';
import Loader from '../../components/Loader/Loader';
import CreateTaskForm from '../../components/CreateTaskForm/CreateTaskForm';
import Alert from '../../components/Alert/Alert';
import { GET_TASKS } from '../../apollo/queries';

import './TasksPage.css';

const TasksPage = () => {
  const [showModal, setShowModal] = useState(false);
  const { error, loading, data } = useQuery(GET_TASKS);

  return (
    <Fragment>
      {showModal && (
        <Modal title='Create Task' onDismiss={() => setShowModal(false)}>
          <CreateTaskForm />
        </Modal>
      )}
      <div className='tasks'>
        <button className='btn' onClick={setShowModal.bind(null, true)}>
          Create Task
        </button>
        <Heading title='Task List' />
        {loading ? (
          <Loader />
        ) : !error && data ? (
          data.tasks.map((task) => <TaskItem key={task.id} task={task} />)
        ) : (
          <Alert alertMsg='Error: Unable to load task list' />
        )}
      </div>
    </Fragment>
  );
};

export default TasksPage;
