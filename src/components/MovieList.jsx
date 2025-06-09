import propTypes from "prop-types";
import MovieCard from "./MovieCard";
import "./MovieList.css";

export default function MovieList({data}){
    return (
        <div className="MovieCardContainer">
        {data ? (
            data.map((movie) => (
                <MovieCard key={movie.id} movie={movie}/>) ) ) : (<p>No Data</p>)}
        </div>
    );
}

MovieList.propTypes ={
    data: propTypes.arrayOf(propTypes.object),
}