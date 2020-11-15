import React, { Fragment, useState } from 'react';
import Heading from '../../components/Heading/Heading';
import TaskList from '../../components/TaskList/TaskList';
import Modal from '../../components/Modal/Modal';
import CreateTaskForm from '../../components/CreateTaskForm/CreateTaskForm';

import './TasksPage.css';

const TasksPage = () => {
  const [showModal, setShowModal] = useState(false);

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
        <TaskList />
      </div>
    </Fragment>
  );
};

export default TasksPage;
