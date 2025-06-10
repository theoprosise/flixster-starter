import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./MovieModal.css";

function MovieModal({ movie, onClose }) {
  
  //console.log(movie);
  if (!movie) {
    return null;
  }
  const [youtubeId, setYoutubeId] = useState(null);
  //console.log(movie.id);
  let movieIdThroughDB = movie.id;
  const getYoutubeID = async () => {
    const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
    const url = `https://api.themoviedb.org/3/movie/${movieIdThroughDB}/videos`;
    try{
      const res = await fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if(!res.ok){
        console.log("Error - check res status code")
      }

      const newData = await res.json();
      console.log(newData.results);
      console.log(newData.results.length)
      let ind = 0;
      let curName = "";
      for(let i = 0; i< newData.results.length; i ++){
      curName = newData.results[i].name.toLowerCase()
      //console.log(curName)
        if(curName.includes("trailer")){
          //console.log("HERE IS WHEER" + i);
          ind = i;
          break;
        }
      }
      console.log(ind);
      setYoutubeId(newData.results[ind].key);

    }
    catch(err){
      console.log("ERROR - check err");
    }
  };


  useEffect(() =>{
    getYoutubeID();
  }, [movie.id]);
  //console.log("YT ID " + youtubeId);
  

  const handleContentClick = (e) => e.stopPropagation();
  return (
    <div id="movieModal" className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={handleContentClick}>
        <h2>{movie.title}</h2>
        <img
          className="movieImage"
          src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
          alt={movie.title}
        />
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title="YouTube video player"
        ></iframe>
        <p>Average Rating: / 10</p>
        <span className="close" onClick={onClose}>
          x
        </span>
      </div>
    </div>
  );
}

export default MovieModal;
