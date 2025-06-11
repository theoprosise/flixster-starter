import propTypes from "prop-types";
import MovieCard from "./MovieCard";
import "./MovieList.css";

export default function MovieList({
  data,
  favorites,
  watched,
  onToggleFavorite,
  onToggleWatched,
}) {
  //Create unique data to protect against redundant clear calls
  const uniqueData = [...new Map(data.map((item) => [item.id, item])).values()];
  return (
    <div className="MovieCardContainer">
      {uniqueData ? (
        uniqueData.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={!!favorites.find((m) => m.id === movie.id)}
            isWatched={!!watched.find((m) => m.id === movie.id)}
            onToggleFavorite={() => onToggleFavorite(movie)}
            onToggleWatched={() => onToggleWatched(movie)}
          />
        ))
      ) : (
        <p>No Data</p>
      )}
    </div>
  );
}

MovieList.propTypes = {
  data: propTypes.arrayOf(propTypes.object),
};
