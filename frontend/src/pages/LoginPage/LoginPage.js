import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../apollo/mutations';
import { saveToken } from '../../utils/localStorage';
import Heading from '../../components/Heading/Heading';

import './LoginPage.css';

const LoginPage = () => {
  const history = useHistory();
  const [loginCredentials, setLoginCredentials] = useState({
    email: '',
    password: '',
  });

  const [userLogin, { data, error }] = useMutation(LOGIN_USER);

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

    await userLogin({ variables: loginCredentials });

    if (error) {
      throw new Error('User login failed');
    }

    if (data && data.loginUser) {
      const token = data.loginUser;
      saveToken(token);
      history.push('/');
    }
  };

  return (
    <form className='login' onSubmit={onSubmitHandle}>
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
      <button className='btn' type='submit'>
        Login
      </button>
    </form>
  );
};

export default LoginPage;
