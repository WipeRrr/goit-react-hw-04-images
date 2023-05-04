import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ url, tags, onClick, largeImageURL }) {
  return (
    <li className={css.ImageGalleryItem}>
      <img className={css.ImageGalleryItemImage} src={url} alt={tags} />
    </li>
  );
}
