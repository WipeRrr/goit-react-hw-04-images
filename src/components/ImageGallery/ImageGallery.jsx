import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem';

export default class ImageGallery extends Component {
  static propTypes = {
    imageName: PropTypes.string.isRequired,
    getLargeImg: PropTypes.func.isRequired,
    image: PropTypes.array.isRequired,
  };

  render() {
    const { image } = this.props;

    return (
      <>
        <ul className={css.ImageGallery}>
          {image.map(({ id, webformatURL, tags, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              url={webformatURL}
              tags={tags}
              onClick={() => this.props.getLargeImg(largeImageURL, tags)}
            />
          ))}
        </ul>
      </>
    );
  }
}
