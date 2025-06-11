import propTypes from "prop-types";
import "./MovieCard.css";
import { useState } from "react";
import MovieModal from "./MovieModal";



//Function to display individual movie on the movie list
export default function MovieCard({ movie, isFavorite, isWatched, onToggleFavorite, onToggleWatched}) {
    //console.log(movie.id);
      const [toggleModal, setToggleModal] = useState(false);
    const stop = e => {e.stopPropagation()};
  return (
    <>
      {toggleModal && <MovieModal movie={movie} onClose={() => setToggleModal(false)}/>}
      <div className="movieCard" onClick={() => setToggleModal(true)}>
        <img
          className="movieImage"
          src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-info">
        <h2>{movie.title}</h2>
        <p>Average Rating: {movie.vote_average.toFixed(1)} / 10</p>
        </div>
        <div className="button-row" onClick={stop}>
            <button className={isFavorite ? "active fav-btn" : "fav-btn"} onClick={onToggleFavorite}>
                {isFavorite ? "Favorited ❤️" : "Favorite 🤍"}
            </button>
            <button className={isWatched ? "active watch-btn" : "watch-btn"} onClick={onToggleWatched}>
                {isWatched ? "Watched 👁️" : "Watch 🙈"}
            </button>
        </div>
      </div>
    </>
  );
}
