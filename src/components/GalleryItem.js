import { useState } from "react";
import { Link } from "react-router-dom";

function GalleryItem(props) {
  let [view, setView] = useState(false);

  const simpleView = () => {
    return (
      <div
        style={{
          width: "25vw",
          height: "20vh",
          border: "1px solid black",
          margin: "2px",
          position: "relative",
        }}
      >
        <img src={props.item.artworkUrl60} alt={props.item.collectionName} />
        <h4>{props.item.trackName}</h4>
      </div>
    );
  };

  const detailView = () => {
    return (
      <div
        style={{
          width: "80vw",
          height: "20vh",
          border: "1px solid black",
          margin: "2px",
          position: "relative",
          backgroundImage: `url(${props.item.artworkUrl100})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          color: "white",
        }}
      >
        <img src={props.item.artworkUrl100} alt={props.item.collectionName} />
        <h4>
          <Link to={`/son/${props.item.trackId}`}>{props.item.trackName}</Link>
        </h4>

        <h5>
          <Link to={`/artist/${props.item.artistId}`}>
            {props.item.artistName}
          </Link>
        </h5>
        <h5>
          <Link to={`/album/${props.item.collectionId}`}>
            {props.item.collectionName}
          </Link>
        </h5>
      </div>
    );
  };

  return (
    <div
      style={{ display: "inline-block" }}
      onClick={() => {
        setView(!view);
      }}
      className="galleryItem"
    >
      {view ? detailView() : simpleView()}
    </div>
  );
}

export default GalleryItem;
