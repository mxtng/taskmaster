import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../apollo/mutations';
import { saveToken } from '../../utils/localStorage';
import Heading from '../../components/Heading/Heading';

import './RegisterPage.css';

const LoginPage = () => {
  const history = useHistory();
  const [registerCredentials, setRegisterCredentials] = useState({
    email: '',
    password: '',
  });

  const [userCreate, { error }] = useMutation(CREATE_USER);

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
      const token = data.createUser;
      saveToken(token);
      history.push('/');
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
