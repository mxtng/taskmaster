import React, { Fragment } from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { useApolloClient, gql, useQuery } from '@apollo/client';
import { removeUserAuth } from '../../utils/localStorage';

import './Navbar.css';

const Navbar = () => {
  const history = useHistory();
  const client = useApolloClient();
  const { data } = useQuery(gql`
    query currentUser {
      currentUser @client {
        token
      }
    }
  `);

  const onLogoutHandle = () => {
    history.push('/');
    removeUserAuth();
    client.resetStore();
  };

  return (
    <header className='nav'>
      <input type='checkbox' id='nav__checkbox' />

      <h1>
        <Link to='/'>Taskmaster</Link>
      </h1>
      <nav className='nav__links'>
        <NavLink to='/tasks'>Tasks</NavLink>

        {data ? (
          <Fragment>
            <NavLink to='/dashboard'>Dashboard</NavLink>
            <div className='nav__btn' onClick={() => onLogoutHandle()}>
              Logout
            </div>
          </Fragment>
        ) : (
          <NavLink to='/login'>Sign In</NavLink>
        )}
      </nav>

      <label className='nav__btn' htmlFor='nav__checkbox'>
        <div></div>
      </label>
    </header>
  );
};

export default Navbar;
