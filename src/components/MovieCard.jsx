import propTypes from "prop-types";
import "./MovieCard.css";
//Function to display individual movie on the movie list
export default function MovieCard({movie}){
    return(
        <div className="movieCard">
            <img className="movieImage" src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`} alt={movie.title}/>
            <h2>{movie.title}</h2>
            <p>Average Rating: {movie.vote_average} / 10</p>
        </div>
    )
}