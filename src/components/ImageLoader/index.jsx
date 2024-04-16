/* eslint-disable react/prop-types */
import { useState } from "react";
import Loader from "../Loader";
import "./index.scss";

const ImageLoader = ({ src, alt, onClick }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <div className='image-container'>
      {loading && <Loader />}
      {error ? (
        <span>Error loading image</span>
      ) : (
        <img
          src={src}
          alt={alt}
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{ display: loading ? "none" : "block" }}
          onClick={onClick}
        />
      )}
    </div>
  );
};

export default ImageLoader;
