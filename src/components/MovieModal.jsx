import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./MovieModal.css";
import genresData from "./genres.json"
function MovieModal({ movie, onClose }) {
  
  //console.log(movie);
  if (!movie) {
    return null;
  }
  const [youtubeId, setYoutubeId] = useState(null);
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
      //console.log(newData.results);
      //console.log(newData.results.length)
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
      //console.log(ind);
      setYoutubeId(newData.results[ind].key);

    }
    catch(err){
      console.log("ERROR - check err");
    }
  };


  useEffect(() =>{
    getYoutubeID();
  }, [movie.id]);

  //Function to get genre text from the provided genre ids
  const getGenres = () =>{
    let ret = "";
    for(let i = 0; i < movie.genre_ids.length; i ++){
    genresData.genres.forEach(genre =>{
      if(genre.id == movie.genre_ids[i]){
        ret = ret +" " + genre.name+",";
      }
    })
  }
  ret.trim();
    return ret.slice(0,-1);
}
//Genre text to be displayed on the modal
 let genresText = getGenres();
  
  const handleContentClick = (e) => e.stopPropagation();
  return (
    <div id="movieModal" className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={handleContentClick}>
         <span className="close" onClick={onClose}>
          x
        </span>
        <h2>{movie.title}</h2>
        
        <img
          className="movieImage"
          src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
          alt="Movie Poster"
        />
        <p>Released on: {movie.release_date}</p>
        <p>Overview: {movie.overview}</p>
        <p>Genres: {genresText}</p>
    
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title="YouTube video player"
          alt="Movie Trailer"
        ></iframe>
       
      </div>
    </div>
  );
}

export default MovieModal;
