import css from './Modal.module.css';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  static propTypes = {
    toggleModal: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
  };

  state = {};

  componentDidMount() {
    window.addEventListener('keydown', this.clickEsc);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.clickEsc);
  }

  clickBackdrop = event => {
    if (event.target === event.currentTarget) {
      this.props.toggleModal();
    }
  };

  clickEsc = event => {
    if (event.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  render() {
    return createPortal(
      <div className={css.overlay} onClick={this.clickBackdrop}>
        <div className={css.modal}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}
