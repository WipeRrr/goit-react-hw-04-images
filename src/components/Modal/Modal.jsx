import css from './Modal.module.css'
import { Component } from 'react';
import PropTypes from 'prop-types';



export default class Modal extends Component {
  static propTypes = {
    // url: PropTypes.string.isRequired,
    toggleModal: PropTypes.func.isRequired,
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
   
    return (
      <div className={css.overlay} onClick={this.clickBackdrop}>
        <div className={css.modal}>
          <img src="" alt="" />
        </div>
      </div>
    );
  }
}