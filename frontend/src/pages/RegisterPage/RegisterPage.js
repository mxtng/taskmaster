import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { CREATE_USER } from '../../apollo/mutations';
import { saveUserAuth } from '../../utils/localStorage';
import Heading from '../../components/Heading/Heading';

import './RegisterPage.css';

const LoginPage = () => {
  const history = useHistory();
  const [registerCredentials, setRegisterCredentials] = useState({
    email: '',
    password: '',
  });

  const [userCreate, { error, client }] = useMutation(CREATE_USER);

  const onChangeHandle = (e) => {
    setRegisterCredentials({
      ...registerCredentials,
      [e.target.id]: e.target.value,
    });
  };

  const { email, password } = registerCredentials;

  const onSubmitHandle = async (e) => {
    e.preventDefault();

    if (email === '' || password === '') {
      console.log('Please enter fields');
      return;
    }

    const { data } = await userCreate({ variables: registerCredentials });

    if (error) {
      throw new Error('User registration failed');
    }

    if (data && data.createUser) {
      const userAuth = data.createUser;

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
    <div className='register'>
      <form className='register__form' onSubmit={onSubmitHandle}>
        <Heading title='Register' />
        <div className='register__group'>
          <label className='register__label' htmlFor='email'>
            Email
          </label>
          <input
            className='register__input'
            type='text'
            id='email'
            value={email}
            onChange={onChangeHandle}
          />
        </div>
        <div className='register__group'>
          <label className='register__label' htmlFor='password'>
            Password
          </label>
          <input
            className='register__input'
            type='password'
            id='password'
            value={password}
            onChange={onChangeHandle}
          />
        </div>
        <div className='register__group'>
          <button className='btn' type='submit'>
            Sign Up
          </button>
        </div>
      </form>
      <p className='register__subtitle'>
        Already have an account? <Link to='/login'>Sign in</Link>
      </p>
    </div>
  );
};

export default LoginPage;
