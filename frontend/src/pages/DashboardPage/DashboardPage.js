import React, { Fragment, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import Card from '../../components/Card/Card';
import Heading from '../../components/Heading/Heading';
import TaskList from '../../components/TaskList/TaskList';
import Modal from '../../components/Modal/Modal';
import CreateTaskForm from '../../components/CreateTaskForm/CreateTaskForm';

import './DashboardPage.css';

const DashboardPage = () => {
  const [showModal, setShowModal] = useState(false);

  const { data } = useQuery(gql`
    query currentUser {
      currentUser @client {
        token
        userId
      }
    }
  `);

  return (
    <Fragment>
      {showModal && (
        <Modal title='Create Task' onDismiss={() => setShowModal(false)}>
          <CreateTaskForm />
        </Modal>
      )}
      <div className='dashboard'>
        <div className='dashboard__main'>
          <Card>
            <Heading title='My Dashboard' />
            <button className='btn' onClick={setShowModal.bind(null, true)}>
              Create Task
            </button>
          </Card>
        </div>
        <Heading title='My Task' />
        <TaskList />
      </div>
    </Fragment>
  );
};

export default DashboardPage;
