import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';



export default class App extends Component {
  state = {
    imageName: '',
  };



  handleFormSubmit = imageName => {
    this.setState({ imageName });
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit}></Searchbar>
        <ImageGallery imageName={this.state.imageName}></ImageGallery>

        <ToastContainer />
      </div>
    );
  }
}

