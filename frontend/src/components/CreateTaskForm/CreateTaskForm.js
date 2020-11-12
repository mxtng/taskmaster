import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_TASK } from '../../apollo/mutations';
import { GET_TASKS } from '../../apollo/queries';
import Alert from '../../components/Alert/Alert';

import './CreateTaskForm.css';

const CreateTaskForm = (props) => {
  const [createTask, { error }] = useMutation(CREATE_TASK);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    category: '',
  });

  const onChangeHandle = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const { title, description, budget, category } = formData;

  const onSubmitHandle = (e) => {
    e.preventDefault();

    if (
      title === '' ||
      description === '' ||
      budget === '' ||
      category === ''
    ) {
      console.log('Please fill in the fields');
      return;
    }

    createTask({
      variables: { title, description, price: parseFloat(budget), category },
      refetchQueries: [{ query: GET_TASKS }],
    });

    setFormData({ title: '', description: '', budget: '', category: '' });
  };

  return (
    <form onSubmit={onSubmitHandle}>
      {error && <Alert alertMsg='Error: Unable to create task' />}
      <div className='form__group'>
        <label htmlFor='title'>Title</label>
        <input
          className='form__control'
          type='text'
          id='title'
          onChange={onChangeHandle}
          value={title}
        />
      </div>
      <div className='form__group'>
        <label htmlFor='description'>Description</label>
        <input
          className='form__control'
          type='text'
          id='description'
          onChange={onChangeHandle}
          value={description}
        />
      </div>
      <div className='form__group'>
        <label htmlFor='budget'>Budget</label>
        <input
          className='form__control'
          type='number'
          id='budget'
          onChange={onChangeHandle}
          value={budget}
        />
      </div>
      <div className='form__group'>
        <label htmlFor='category'>Category</label>
        <input
          className='form__control'
          type='text'
          id='category'
          onChange={onChangeHandle}
          value={category}
        />
      </div>
      <button type='submit' className='btn form__btn'>
        Create Task
      </button>
    </form>
  );
};

export default CreateTaskForm;
