import React, { Fragment, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Heading from '../../components/Heading/Heading';
import TaskItem from '../../components/TaskItem/TaskItem';
import Modal from '../../components/Modal/Modal';
import Spinner from '../../components/Spinner/Spinner';

import './TasksPage.css';

const GET_TASKS = gql`
  query {
    tasks {
      id
      title
      description
      category
      price
    }
  }
`;

const TasksPage = () => {
  const [showModal, setShowModal] = useState(false);
  const { error, loading, data } = useQuery(GET_TASKS);

  return (
    <Fragment>
      {showModal && (
        <Modal title='Create Title' onDismiss={() => setShowModal(false)}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque
          voluptas sapiente porro fuga deserunt sit architecto reprehenderit
          illo quae cupiditate.
        </Modal>
      )}
      <div className='tasks'>
        <button className='btn' onClick={() => setShowModal(true)}>
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
