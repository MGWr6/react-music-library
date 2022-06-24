import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const AlbumView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [albumData, setAlbumData] = useState([]);

  useEffect(() => {
    const API_URL = `http://localhost:4000/song/${id}`;
    const fetchData = async () => {
      const response = await fetch(API_URL);
      const resData = await response.json();
      setAlbumData(resData.results);
    };
    fetchData();
  }, [id]);

  const navButtons = () => {
    return (
      <div>
        <button onClick={() => navigate("/")}>Home</button> |
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    );
  };

  const justSongs = albumData.filter((entry) => entry.wrapperType === "track");

  const renderAlbum = justSongs.map((song, i) => {
    return (
      <div key={i}>
        <Link to={`/song/${song.trackId}`}>
          <p>{song.trackName}</p>
        </Link>
      </div>
    );
  });

  const displayAlbum = (data) => {
    return (
      <div>
        <img src={data.artworkUrl100} />
        <h2>{data.collectionName}</h2>
        <h3>{data.artistName}</h3>
      </div>
    );
  };

  return (
    <div>
      {navButtons()}
      {albumData.length > 0 ? (
        <h2>{displayAlbum(albumData[0])}</h2>
      ) : (
        <h2>Loading...</h2>
      )}
      <hr />
      {renderAlbum}
    </div>
  );
};

export default AlbumView;
