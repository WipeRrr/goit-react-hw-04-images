import css from './Modal.module.css';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ toggleModal, children }) {
  useEffect(() => {
    window.addEventListener('keydown', clickEsc);
    return () => {
      window.removeEventListener('keydown', clickEsc);
    };
  });

  const clickEsc = event => {
    if (event.code === 'Escape') {
      toggleModal();
    }
  };

  const clickBackdrop = event => {
    if (event.target === event.currentTarget) {
      toggleModal();
    }
  };

  return createPortal(
    <div className={css.overlay} onClick={clickBackdrop}>
      <div className={css.modal}>{children}</div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
