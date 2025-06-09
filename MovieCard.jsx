import propTypes from "prop-types";
import "./MovieCard.css";

export default function MovieCard({movie}){
    return(
        <div className="movieCard">
            <img src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`} alt={movie.title}/>
            <h3>{movie.title}</h3>
            <p>{movie.vote_average}</p>
        </div>
    )
}