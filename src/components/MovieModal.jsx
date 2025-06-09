import React from "react";
import ReactDOM from "react-dom";
import "./MovieModal.css";

function MovieModal(movie) {
    console.log(movie)
  return (
    <div id="movieModal" className="modal-overlay" >
      <div className="modal-content">
        <img
          className="movieImage"
          src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
          alt={movie.title}
        />
        <h2>{movie.title}</h2>
        <p>Average Rating: {movie.vote_average} / 10</p>    
      </div>
    </div>
  );
}

export default MovieModal;
