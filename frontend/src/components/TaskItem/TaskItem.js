import React, { Fragment } from 'react';
import Card from '../Card/Card';

import './TaskItem.css';

const TaskItem = ({ task }) => {
  return (
    <Card className='taskitem'>
      <Fragment>
        <h2 className='taskitem__title'>{task.title}</h2>
        <p>
          {task.description}
        </p>
        <div className='taskitem__subtitle'>
          <h4>Budget: ${task.price}</h4>
          <h4>Bid: {task.bid}</h4>
        </div>
        <button className='btn'>Make A Bid</button>
      </Fragment>
    </Card>
  );
};

export default TaskItem;
