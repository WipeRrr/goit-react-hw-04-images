import { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import * as Scroll from 'react-scroll';
import imageApi from './services/image-api';
import Loader from 'components/Loader';
import Button from 'components/Button';
import Modal from 'components/Modal';

const Status = {
  IDLE: 'idle',
  RESOLVED: 'resolved',
  PENDING: 'pending',
  REJECTED: 'rejected',
};

const scroll = Scroll.animateScroll;

export default class App extends Component {
  state = {
    imageName: '',
    image: [],
    error: null,
    status: Status.IDLE,
    showModal: false,
    modalImg: '',
    tags: '',
    page: 1,
    totalHits:''
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.imageName;
    const nextName = this.state.imageName;

    if (prevName !== nextName) {
      this.setState({ status: Status.PENDING });
      imageApi
        .fetchImage(nextName, this.state.page)
        .then(image =>
          this.setState({
            image: image.hits,
            status: Status.RESOLVED,
            page: prevState.page + 1,
            totalHits: image.totalHits
          })
        )
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
  }

  loadImage = () => {
    imageApi
      .fetchImage(this.state.imageName, this.state.page)
      .then(image => {
        this.setState(prevState => ({
          image: [...prevState.image, ...image.hits],
          status: Status.RESOLVED,
          page: prevState.page + 1,
        }));
      })
      .catch(error => this.setState({ error, status: Status.REJECTED }));
    this.scrollToBottom();
  };

  scrollToBottom = () => {
    scroll.scrollMore(1000);
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  getLargeImg = (largeImageURL, tags) => {
    this.toggleModal();
    this.setState({ modalImg: largeImageURL, tags });
  };

  handleFormSubmit = imageName => {
    this.setState({ page: 1 });
    this.setState({ imageName });
  };

  render() {
    const { image, error, status, modalImg, tags, showModal, page, totalHits } =
      this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} page={page}></Searchbar>

        {status === 'idle' && (
          <div className="idleThumb">
            <p>↑Use search field↑</p>
            <h1>The gallery is empty 🙁</h1>
          </div>
        )}

        {status === 'pending' && <Loader />}

        {status === 'rejected' && alert(error.message)}

        {status === 'resolved' && (
          <>
            <ImageGallery
              imageName={this.state.imageName}
              image={image}
              getLargeImg={this.getLargeImg}
            ></ImageGallery>
            {showModal && (
              <Modal toggleModal={this.toggleModal}>
                <img src={modalImg} alt={tags} />
              </Modal>
            )}

            {image.length < totalHits && (
              <Button onClick={this.loadImage}></Button>
            )}

            {image.length === 0 && (
              <h2 className="rejectTitle">
                No image for your request. Please, try again.
              </h2>
            )}

            {/* {image.length !== totalHits ? (
              <Button onClick={this.loadImage}></Button>
            ) : (
              <h2 className="rejectTitle">
                No image for your request. Please, try again.
              </h2>
            )} */}
          </>
        )}
      </div>
    );
  }
}
