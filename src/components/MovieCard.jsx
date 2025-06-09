import propTypes from "prop-types";
import "./MovieCard.css";
import { useState } from "react";
import MovieModal from "./MovieModal";



//Function to display individual movie on the movie list
export default function MovieCard({ movie }) {
      const [toggleModal, setToggleModal] = useState(false);

  return (
    <>
      {toggleModal && <MovieModal movie={movie}/>}
      <div className="movieCard" onClick={() => setToggleModal(!toggleModal)}>
        <img
          className="movieImage"
          src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
          alt={movie.title}
        />
        <h2>{movie.title}</h2>
        <p>Average Rating: {movie.vote_average} / 10</p>
      </div>
    </>
  );
}
