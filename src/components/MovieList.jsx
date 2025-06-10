import propTypes from "prop-types";
import MovieCard from "./MovieCard";
import "./MovieList.css";

export default function MovieList({data, favorites,watched,onToggleFavorite,onToggleWatched}){
    return (
        <div className="MovieCardContainer">
        {data ? (
            data.map((movie) => (
                <MovieCard key={movie.id} movie={movie}
                isFavorite={!!favorites.find(m=>m.id===movie.id)}
                isWatched = {!!watched.find(m=>m.id===movie.id)}
                onToggleFavorite={() =>onToggleFavorite(movie)}
                onToggleWatched={()=>onToggleWatched(movie)}
                />) ) ) : (<p>No Data</p>)}
        </div>
    );
}

MovieList.propTypes ={
    data: propTypes.arrayOf(propTypes.object),
}