import React, { Fragment, useState, useEffect } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import Card from '../../components/Card/Card';
import Heading from '../../components/Heading/Heading';
import TaskList from '../../components/TaskList/TaskList';
import Modal from '../../components/Modal/Modal';
import CreateTaskForm from '../../components/CreateTaskForm/CreateTaskForm';

import './DashboardPage.css';

const DashboardPage = () => {
  const [isMounted, setIsMounted] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [getCurrentUser, { data }] = useLazyQuery(gql`
    query {
      currentUser @client {
        userId
      }
    }
  `);

  useEffect(() => {
    if (isMounted) {
      getCurrentUser();
    }
    return () => {
      setIsMounted(false);
    };
  }, [isMounted, getCurrentUser]);

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
        <TaskList userId={data && data.currentUser.userId} />
      </div>
    </Fragment>
  );
};

export default DashboardPage;
