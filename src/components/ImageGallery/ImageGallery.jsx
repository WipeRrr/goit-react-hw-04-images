import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem';

export default function ImageGallery({ image, getLargeImg }) {
  return (
    <>
      <ul className={css.ImageGallery}>
        {image.map(({ id, webformatURL, tags, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            url={webformatURL}
            tags={tags}
            onClick={() => getLargeImg(largeImageURL, tags)}
          />
        ))}
      </ul>
    </>
  );
}

ImageGallery.propTypes = {
  getLargeImg: PropTypes.func.isRequired,
  image: PropTypes.array.isRequired,
};
