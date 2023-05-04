import { Component } from 'react';
import imageApi from '../services/image-api';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Loader from 'components/Loader';
import Button from 'components/Button';
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
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imageName;
    const nextName = this.props.imageName;

    if (prevName !== nextName) {
      this.setState({ status: Status.PENDING });
      imageApi
        .fetchImage(nextName)
        .then(image => this.setState({ image, status: Status.RESOLVED }))
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
  }

  render() {
    const { image, error, status } = this.state;
    console.log(image);

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

    if (image.hits.length === 0) {
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
            {image.hits.map(({ id, webformatURL, tags }) => (
              <ImageGalleryItem key={id} url={webformatURL} tags={tags} />
            ))}
          </ul>

          <Button ></Button>
        </>
      );
    }
  }
}
