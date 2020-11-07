import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.css';

const Navbar = () => {
  return (
    <header>
      <h1>Taskmaster</h1>
      <nav>
        <ul>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink to='/tasks'>Tasks</NavLink>
          </li>
          <li>
            <NavLink to='/login'>Sign In</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
