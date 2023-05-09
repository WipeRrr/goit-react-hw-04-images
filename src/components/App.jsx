import { useState, useEffect } from 'react';
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

export default function App() {
  const [imageName, SetimageName] = useState('');
  const [image, SetImage] = useState([]);
  const [error, SetError] = useState(null);
  const [status, SetStatus] = useState(Status.IDLE);
  const [showModal, SetShowModal] = useState(false);
  const [modalImg, SetmodalImg] = useState({});
  const [tags, SetTags] = useState('');
  const [page, SetPage] = useState(1);
  const [totalHits, SetTotalHits] = useState('');

  useEffect(() => {
    if (!imageName) {
      return;
    }
    if (page === 1) {
      SetStatus(Status.PENDING);
      imageApi
        .fetchImage(imageName, page)
        .then(image => {
          SetImage(image.hits);
          SetTotalHits(image.totalHits);
          SetStatus(Status.RESOLVED);
        })
        .catch(error => {
          SetError(error);
          SetStatus(Status.REJECTED);
        });
      return;
    }
    SetStatus(Status.PENDING);
    imageApi
      .fetchImage(imageName, page)
      .then(image => {
        SetImage(prevImage => [...prevImage, ...image.hits]);
        SetStatus(Status.RESOLVED);
      })
      .catch(error => {
        SetError(error);
        SetStatus(Status.REJECTED);
      });
    scrollToBottom();
  }, [imageName, page]);

  const scrollToBottom = () => {
    scroll.scrollMore(1000);
  };

  const toggleModal = () => {
    SetShowModal(!showModal);
  };

  const getLargeImg = (largeImageURL, tags) => {
    toggleModal();
    SetmodalImg(largeImageURL);
    SetTags(tags);
  };

  const handleFormSubmit = imageName => {
    SetimageName(imageName);
    SetPage(1);
  };

  const loadMoreBtn = () => {
    SetPage(prevPage => prevPage + 1);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit}></Searchbar>

      {status === Status.IDLE && (
        <div className="idleThumb">
          <p>↑Use search field↑</p>
          <h1>The gallery is empty 🙁</h1>
        </div>
      )}

      {status === Status.PENDING && <Loader />}

      {status === Status.REJECTED && alert(error.message)}

      {status === Status.RESOLVED && (
        <>
          <ImageGallery image={image} getLargeImg={getLargeImg}></ImageGallery>
          {showModal && (
            <Modal toggleModal={toggleModal}>
              <img src={modalImg} alt={tags} />
            </Modal>
          )}

          {image.length !== totalHits && (
            <Button onClick={loadMoreBtn}></Button>
          )}

          {image.length === 0 && (
            <h2 className="rejectTitle">
              No image for your request. Please, try again.
            </h2>
          )}
        </>
      )}
    </div>
  );
}
