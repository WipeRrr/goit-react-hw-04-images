import { Component } from 'react';
import imageApi from '../services/image-api';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Loader from 'components/Loader';
import Button from 'components/Button';
import Modal from 'components/Modal';
const Status = {
  IDLE: 'idle',
  RESOLVED: 'resolved',
  PENDING: 'pending',
  REJECTED: 'rejected',
};

export default class ImageGallery extends Component {
  state = {
    image: [],
    error: null,
    status: Status.IDLE,
    showModal: false,
    modalImg: '',
    tags: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imageName;
    const nextName = this.props.imageName;

    if (prevName !== nextName) {
      this.setState({ status: Status.PENDING });
      imageApi
        .fetchImage(nextName)
        .then(image =>
          this.setState({ image: image.hits, status: Status.RESOLVED })
        )
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
  }

  loadImage = () => {
    imageApi
      .fetchImage(this.props.imageName)
      .then(image => {
        this.setState(prevState => ({
          image: [...prevState.image, ...image.hits],
          status: Status.RESOLVED,
        }));
      })
      .catch(error => this.setState({ error, status: Status.REJECTED }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  onImgClick = () => {
    this.toggleModal();
  };

  getLargeImg = (largeImageURL, tags) => {
    this.toggleModal();
    this.setState({ modalImg: largeImageURL, tags });
  };

  render() {
    const { image, error, status, modalImg, tags, showModal } = this.state;
    if (status === 'idle') {
      return (
        <div className={css.idleThumb}>
          <p>↑Use search field↑</p>
          <h1>The gallery is empty 🙁</h1>
        </div>
      );
    }
    if (status === 'pending') {
      return <Loader />;
    }

    if (image.length === 0) {
      return (
        <h2 className={css.rejectTitle}>
          No image for your request. Please, try again.
        </h2>
      );
    }

    if (status === 'rejected') {
      alert(error.message);
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className={css.ImageGallery}>
            {image.map(({ id, webformatURL, tags, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                url={webformatURL}
                tags={tags}
                onClick={() => this.getLargeImg(largeImageURL, tags)}
              />
            ))}
          </ul>
          {showModal && (
            <Modal toggleModal={this.toggleModal}>
              <img src={modalImg} alt={tags} />
            </Modal>
          )}
          <Button onClick={this.loadImage}></Button>
        </>
      );
    }
  }
}
