import React, { Fragment, useState } from 'react';
import { useQuery } from '@apollo/client';
import Heading from '../../components/Heading/Heading';
import TaskItem from '../../components/TaskItem/TaskItem';
import Modal from '../../components/Modal/Modal';
import Spinner from '../../components/Spinner/Spinner';
import CreateTaskForm from '../../components/CreateTaskForm/CreateTaskForm';
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
          <Spinner />
        ) : !error && data ? (
          data.tasks.map((task) => <TaskItem key={task.id} task={task} />)
        ) : (
          <div>Error: Unable to load task list</div>
        )}
      </div>
    </Fragment>
  );
};

export default TasksPage;
