import React, { Fragment, useState } from 'react';
import Heading from '../../components/Heading/Heading';
import TaskItem from '../../components/TaskItem/TaskItem';
import Modal from '../../components/Modal/Modal';

import './TasksPage.css';

const list = [
  {
    id: 1,
    title: 'Gardener required',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, magnam? Nostrum eaque esse nisi dolore perferendis dolores harum quod totam?',
    price: 29.99,
    bid: 0,
  },
  {
    id: 2,
    title: 'Furniture removal',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, magnam? Nostrum eaque esse nisi dolore perferendis dolores harum quod totam?',
    price: 75.99,
    bid: 7,
  },
  {
    id: 3,
    title: 'Computer repair',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, magnam? Nostrum eaque esse nisi dolore perferendis dolores harum quod totam?',
    price: 119.99,
    bid: 2,
  },
  {
    id: 4,
    title: 'Handy man',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, magnam? Nostrum eaque esse nisi dolore perferendis dolores harum quod totam?',
    price: 59.99,
    bid: 5,
  },
];

const TasksPage = () => {
  const [showModal, setShowModal] = useState(false);
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
        <Heading title='Tasks List' />
        {list.map((item) => (
          <TaskItem key={item.id} item={item} />
        ))}
      </div>
    </Fragment>
  );
};

export default TasksPage;
