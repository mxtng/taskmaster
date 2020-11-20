import React from 'react';
import { Link } from 'react-router-dom';
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
          <h1>
            A Freelance Marketplace <span>for Freelancers</span>
          </h1>
          {/* <div className='btn'> */}
          <Link className='btn' to='/tasks'>
            Browse Listings
          </Link>
          {/* </div> */}
        </div>
      </div>
      <div className='categories'>
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
