import React, { useState, useEffect } from "react";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button";
import imagesApi from "./images-api";
import Loader from "react-loader-spinner";
import Modal from "./components/Modal";
import "./App.scss";

export default function App() {
  const [hits, setHits] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (!query) {
      return;
    }

    const fetchImages = () => {
      setIsLoading(true);
      imagesApi
        .fetchImages({ searchQuery: query, currentPage })
        .then((responseHits) => {
          setHits((prevHits) => [...prevHits, ...responseHits]);
          // setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
        })
        .catch((error) => setError({ error }))
        .finally(() => setIsLoading(false));
    };
    fetchImages();
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }, [currentPage, query]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const choseModalPic = (event) => {
    const largePicture = event.currentTarget.srcset;
    setSelectedImage(largePicture);
    toggleModal();
  };

  const onChangeQuery = (query) => {
    setQuery(query);
    setCurrentPage(1);
    setHits([]);
    setError(null);
  };
  const updatePage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="App">
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={selectedImage} alt="" />
        </Modal>
      )}
      {error && <h1>Ой ошибка, всё пропало!!!</h1>}
      <Searchbar onSubmit={onChangeQuery} />
      <ImageGallery images={hits} openModal={choseModalPic} />
      {isLoading && (
        <div className="Loader">
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000}
          />
        </div>
      )}

      {hits.length > 0 && !isLoading && <Button loadMore={updatePage} />}
    </div>
  );
}
