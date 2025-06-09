import React from "react";
import ReactDOM from "react-dom";
import "./MovieModal.css";

function MovieModal({movie}) {
 console.log(movie)
  return (
    <div id="movieModal" className="modal-overlay" >
      <div className="modal-content">
        <h2>{movie.title}</h2>
        <p>Average Rating: / 10</p>    
      </div>
    </div>
  );
}

export default MovieModal;
