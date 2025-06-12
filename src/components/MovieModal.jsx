import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./MovieModal.css";
import genresData from "./genres.json";
function MovieModal({ movie, onClose }) {
  if (!movie) {
    return null;
  }
  const [youtubeId, setYoutubeId] = useState(null);
  let movieIdThroughDB = movie.id;

  const getMovieTrailerIndex = (movieData) => {
    let ind = 0;
    let curTrailerName = "";
    for (let i = 0; i < movieData.results.length; i++) {
      curTrailerName = movieData.results[i].name.toLowerCase();
      if (curTrailerName.includes("trailer")) {
        ind = i;
        break;
      }
    }
    return ind;
  };

  //Get the youtube specific key for movie in modal
  const getYoutubeID = async () => {
    const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
    const url = `https://api.themoviedb.org/3/movie/${movieIdThroughDB}/videos`;
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) {
        console.log("Error - check res status code");
      }

      const newData = await res.json();
      let trailerIndex = getMovieTrailerIndex(newData);

      setYoutubeId(newData.results[trailerIndex].key);
    } catch (err) {
      console.log("ERROR - check err");
    }
  };

  //Get new information on movie update (new modal click)
  useEffect(() => {
    getYoutubeID();
  }, [movie.id]);

  useEffect(() => {
    getMovieRuntime();
  }, [movie.id]);

  const [runtimeText, setRuntime] = useState(null);
  //Query detailed endpoint to get runtime data from movie id
  const getMovieRuntime = async () => {
    const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
    const url = `https://api.themoviedb.org/3/movie/${movieIdThroughDB}`;
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) {
        console.log("Error - check res status code");
      }
      const newData = await res.json();

      setRuntime(newData.runtime);
    } catch (err) {
      console.log("ERROR - check err");
    }
  };

  //Genre text from the provided genre ids
  const getGenres = () => {
    let ret = "";
    for (let i = 0; i < movie.genre_ids.length; i++) {
      genresData.genres.forEach((genre) => {
        if (genre.id == movie.genre_ids[i]) {
          ret = ret + " " + genre.name + ",";
        }
      });
    }
    ret.trim();
    return ret.slice(0, -1);
  };

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
        <p>Runtime: {runtimeText} mins</p>

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
