import React from 'react';
import {
  IoIosBicycle,
  IoIosBody,
  IoIosConstruct,
  IoIosCamera,
  IoIosDesktop,
} from 'react-icons/io';

import './HomePage.css';

const Home = () => {
  return (
    <div>
      <div className='img'>
        <div className='front'>
          <h2>Not sure where to look for help?</h2>
          <div className='btn'>Start here or enlist your expertise!</div>
        </div>
      </div>
      <div className='categories'>
        <h2>Categories</h2>
        <div className='icon'>
          <IoIosBicycle />
        </div>
        <div className='icon'>
          <IoIosBody />
        </div>
        <div className='icon'>
          <IoIosConstruct />
        </div>
        <div className='icon'>
          <IoIosCamera />
        </div>
        <div className='icon'>
          <IoIosDesktop />
        </div>
      </div>
    </div>
  );
};

export default Home;
