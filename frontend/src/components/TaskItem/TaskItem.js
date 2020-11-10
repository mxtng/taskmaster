import React, { Fragment } from 'react';
import Card from '../Card/Card';

import './TaskItem.css';

const TaskItem = ({ item }) => {
  return (
    <Card className='taskitem'>
      <Fragment>
        <h2 className='taskitem__title'>{item.title}</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
          adipisci suscipit necessitatibus quia vero excepturi minima sed fugiat
          libero perferendis!
        </p>
        <div className='taskitem__subtitle'>
          <h4>Budget: ${item.price}</h4>
          <h4>Bid: {item.bid}</h4>
        </div>
        <button className='btn'>Make A Bid</button>
      </Fragment>
    </Card>
  );
};

export default TaskItem;
