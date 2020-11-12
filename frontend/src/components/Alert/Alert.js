import React from 'react';
import './Alert.css';

const Alert = (props) => {
  return <div className='alert'>{props.alertMsg}</div>;
};

export default Alert;
