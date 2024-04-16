/* eslint-disable react/prop-types */
import useKeyPress from "../../hooks/useKeyPress";
import CrossIcon from "../CrossIcon";
import ImageLoader from "../ImageLoader";
import "./index.scss";
export default function Overlay(props) {
  const { image, setOverlay } = props;
  const onEscape = (e = null) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setOverlay(false);
  };
  useKeyPress("Escape", onEscape);
  return (
    <div className='overlay'>
      <div className='content'>
        <ImageLoader src={image} alt='cat' />
      </div>
      <div className='cross' onClick={onEscape}>
        <CrossIcon width={32} height={32} color='white' />
      </div>
    </div>
  );
}
