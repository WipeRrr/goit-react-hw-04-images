import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './Searchbar';

  //  import 'react-toastify/dist/ReactToastify.css';
// import Modal from './Modal'
// import Loader from './Loader';

export default class App extends Component {
  state = {
   imageName: ''
 }

  handleFormSubmit = imageName => {
  this.setState({imageName})
}




  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit}></Searchbar>
        {/* {this.state.loading && <Loader></Loader>} */}
        {/* {this.stateimage && <div> Image </div>} */}
        {/* <Modal></Modal> */}
        {/* <Loader></Loader> */}
        <ToastContainer />
      </div>
    );
  }
}



















 // state = {
  //   image: null,
  //   loading: true,
  // };

  // componentDidMount() {
  //   this.setState({ loading: true });
  //   fetch(
  //     'https://pixabay.com/api/?q=cat&page=1&key=33763391-fe078dc9f17400c9e34720d71&image_type=photo&orientation=horizontal&per_page=12'
  //   )
  //     .then(res => res.json())
  //     .then(image => this.setState({ image }))
  //     .finally(() => this.setState({ loading: false }));
  // }