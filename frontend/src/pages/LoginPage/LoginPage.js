import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { LOGIN_USER } from '../../apollo/mutations';
import { saveUserAuth } from '../../utils/localStorage';
import Heading from '../../components/Heading/Heading';

import './LoginPage.css';

const LoginPage = () => {
  const history = useHistory();
  const [loginCredentials, setLoginCredentials] = useState({
    email: '',
    password: '',
  });

  const [userLogin, { error, client }] = useMutation(LOGIN_USER);

  const onChangeHandle = (e) => {
    setLoginCredentials({ ...loginCredentials, [e.target.id]: e.target.value });
  };

  const { email, password } = loginCredentials;

  const onSubmitHandle = async (e) => {
    e.preventDefault();

    if (email === '' || password === '') {
      console.log('Please enter fields');
      return;
    }

    const { data } = await userLogin({ variables: loginCredentials });

    if (error) {
      throw new Error('User login failed');
    }

    if (data && data.loginUser) {
      const userAuth = data.loginUser;

      // save user auth (token & userId) to local storage
      saveUserAuth(userAuth);

      history.push('/');

      client.writeQuery({
        query: gql`
          query currentUser {
            currentUser {
              token
              userId
            }
          }
        `,
        data: {
          currentUser: {
            token: userAuth.token,
            userId: userAuth.userId,
            __typename: 'currentUser',
          },
        },
      });
    }
  };

  return (
    <div className='login'>
      <form className='login__form' onSubmit={onSubmitHandle}>
        <Heading title='Sign in' />
        <div className='login__group'>
          <label className='login__label' htmlFor='email'>
            Email
          </label>
          <input
            className='login__input'
            type='text'
            id='email'
            value={email}
            onChange={onChangeHandle}
          />
        </div>
        <div className='login__group'>
          <label className='login__label' htmlFor='password'>
            Password
          </label>
          <input
            className='login__input'
            type='password'
            id='password'
            value={password}
            onChange={onChangeHandle}
          />
        </div>
        <div className='login__group'>
          <button className='btn' type='submit'>
            Login
          </button>
        </div>
      </form>
      <p className='login__subtitle'>
        Don't have an account? <Link to='/register'>Sign up</Link>
      </p>
    </div>
  );
};

export default LoginPage;
