import React from 'react';
import Heading from '../../components/Heading/Heading';
import TaskItem from '../../components/TaskItem/TaskItem';

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
  return (
    <div className='tasks'>
      <Heading title='Tasks List' />
      {list.map((item) => (
        <TaskItem item={item} />
      ))}
    </div>
  );
};

export default TasksPage;
