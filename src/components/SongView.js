import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function SongView() {
  const { id } = useParams();
  const [songData, setSongData] = useState([]);
  const navigate = useNavigate();

  const navButtons = () => {
    return (
      <div>
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    );
  };

  useEffect(() => {
    const API_URL = `http://localhost:4000/album/${id}`;
    const fetchData = async () => {
      const response = await fetch(API_URL);
      const resData = await response.json();
      setSongData(resData.results);
    };
    fetchData();
  }, [id]);

  const displaySong = (data) => {
    return (
      <div>
        <img src={data.artworkUrl100} />
        <h2>{data.trackName}</h2>
        <h3>
          <Link to={`/artist/${data.artistId}`}>{data.artistName}</Link>
        </h3>

        <p>Released {formatDate(data.releaseDate)}</p>
      </div>
    );
  };

  const formatDate = (date) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let arr = data.split("-");
    return `${months[parseInt(arr[1])]} ${arr[2].substring(0, 2)}, ${arr[0]}`;
  };

  return (
    <div>
      {navButtons()}
      {songData.lenght > 0 ? displaySong(songData[0]) : <h2>Loading...</h2>}
    </div>
  );
}

export default SongView;