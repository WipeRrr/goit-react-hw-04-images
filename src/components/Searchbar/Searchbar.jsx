import { toast } from 'react-toastify';
import css from './Searchbar.module.css';
import { Component } from 'react';
import React from 'react';

import 'react-toastify/dist/ReactToastify.css';

class Searchbar extends Component {
  state = {
    imageName: '',
  };

  handleNameChange = e => {
    this.setState({ imageName: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.imageName.trim() === '') {
      toast.error('Please enter something');
      return;
    }
    this.props.onSubmit(this.state.imageName);
    this.setState({ imageName: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button
            aria-label="Search"
            type="submit"
            className={css.SearchFormButton}
          >
            <span className={css.buttonLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleNameChange}
            value={this.state.imageName}
            name="imageName"
          />
        </form>
      </header>
    );
  }
}
export default Searchbar;
