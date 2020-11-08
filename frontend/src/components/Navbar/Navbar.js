import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import './Navbar.css';

const Navbar = () => {
  return (
    <header className='nav'>
      <input type='checkbox' id='nav__checkbox' />

      <h1>
        <Link to='/'>Taskmaster</Link>
      </h1>
      <nav className='nav__links'>
        <NavLink exact to='/'>
          Categories
        </NavLink>

        <NavLink to='/tasks'>Tasks</NavLink>

        <NavLink to='/login'>Sign In</NavLink>
      </nav>

      <label className='nav__btn' htmlFor='nav__checkbox'>
        {/* <span></span>
        <span></span>
        <span></span> */}
        <div></div>
      </label>
    </header>
  );
};

export default Navbar;
