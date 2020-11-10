import React from 'react';
import ReactDOM from 'react-dom';
import Heading from '../Heading/Heading';
import Spinner from '../Spinner/Spinner';

import './Modal.css';

const Modal = (props) => {
  return ReactDOM.createPortal(
    <div className='modal'>
      {!!props.spinner && <Spinner />}
      {(!!props.children || !!props.title || !!props.actions) && (
        <div className='modal__content'>
          {!!props.onDismiss && (
            <button className='modal__btn-dismiss' onClick={props.onDismiss}>
              x
            </button>
          )}
          {!!props.title && <Heading title={props.title} />}
          {!!props.children && props.children}
          {!!props.actions && (
            <div className='modal__actions'>{props.actions}</div>
          )}
        </div>
      )}
    </div>,
    document.querySelector('#modal')
  );
};

export default Modal;
