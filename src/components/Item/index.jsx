/* eslint-disable react/prop-types */
import { useState } from "react";
import Overlay from "../Overlay";
import "./index.scss";
import ImageLoader from "../ImageLoader";

export default function Item(props) {
  const { cat } = props;
  const [overlay, setOverlay] = useState(false);
  const onImageClick = () => {
    setOverlay(true);
  };
  const handleDragStart = (event) => {
    event.dataTransfer.setData("cat", JSON.stringify(cat));
  };

  return (
    <div
      className='item'
      onClick={onImageClick}
      draggable
      onDragStart={handleDragStart}
    >
      <p>{cat.title}</p>
      <ImageLoader src={cat.image} alt={cat.title} onClick={onImageClick} />
      {overlay && <Overlay image={cat.image} setOverlay={setOverlay} />}
    </div>
  );
}
