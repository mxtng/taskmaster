import React, { Fragment, useState } from 'react';
import Card from '../Card/Card';
import Modal from '../Modal/Modal';

import './TaskItem.css';

const TaskItem = ({ task }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Fragment>
      {showModal && (
        <Modal title='Bid Listing' onDismiss={() => setShowModal(false)}>
          {/* <CreateTaskForm userId={data && data.currentUser.userId} /> */}
        </Modal>
      )}
      <Card>
        <div className='taskitem'>
          <div className='taskitem__content'>
            <h2 className='taskitem__title'>{task.title}</h2>
            <p>{task.description}</p>
          </div>
          <div className='taskitem__subtitle'>
            <h4>Budget: ${task.price}</h4>
            <h4>Bid: {task.bid}</h4>
          </div>
          <div className='taskitem__bid'>
            <button className='btn' onClick={() => setShowModal(true)}>
              Make A Bid
            </button>
          </div>
        </div>
      </Card>
    </Fragment>
  );
};

export default TaskItem;
