import React from "react";
import ReactDOM from "react-dom";
import "./MovieModal.css";

function MovieModal({movie, onClose}) {
 console.log(movie)
 if(!movie){
    return null;
 }
 const handleContentClick = e => e.stopPropagation();
  return (
    <div id="movieModal" className="modal-overlay" onClick={onClose} >
      <div className="modal-content" onClick={handleContentClick}>
        <h2>{movie.title}</h2>
        <img
          className="movieImage"
          src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
          alt={movie.title}
        />
        <p>Average Rating: / 10</p>
        <span className="close" onClick={onClose}>
            x
            </span>    
      </div>
    </div>
  );
}

export default MovieModal;
