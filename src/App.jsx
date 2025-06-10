import { useEffect, useMemo, useState } from 'react'
import './App.css'
import MovieList from './components/MovieList'
import SearchForm from './components/SearchForm'
import MovieModal from './components/MovieModal'
import SideBar from './components/Sidebar'

const App = () => {

const [data, setMovieData] = useState([]);
let [page, setPage] = useState(1);
let [searchQuery, setSearchQuery] = useState("");
const [sortOption, setSortOption] = useState("title");

//Arrays to store the favorited and watched movies
const [favorites, setFavorites] = useState([]);
const [watched, setWatched] = useState([]);

useEffect(() => {
  fetchNowPlaying();
}, [page])

const FetchSearch = async(query) =>{
    const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}`;
    
    try{
      const res = await fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if(!res.ok){
        console.log("Error - check res status code")
      }

      const searchData = await res.json();
      setMovieData(searchData.results);

    }
    catch(err){
      console.log("ERROR - check err");
    }
}


const fetchNowPlaying = async () => {
    const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
    const url = `https://api.themoviedb.org/3/movie/now_playing?&page=${page}`;
    
    try{
      const res = await fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if(!res.ok){
        console.log("Error - check res status code")
      }

      const newData = await res.json();
      setMovieData([...data,...newData.results]);

    }
    catch(err){
      console.log("ERROR - check err");
    }
  };

const toggleFavorite = movie =>{
  setFavorites( favs=>
    favs.find(m=>m.id === movie.id) ?
    favs.filter(m=> m.id !== movie.id)
    : [...favs,movie]
  )
}

const toggleWatched = movie =>{
  setWatched( w=>
    w.find(m=>m.id === movie.id) ?
    w.filter(m=> m.id !== movie.id)
    : [...w,movie]
  )
}

//This is interesting - can talk more about how using memoization is awesome
const sortedData = useMemo( () => {
  const listDataMovies = [...data];
  switch(sortOption){
    case "title":
      return listDataMovies.sort((a,b) =>
      a.title.localeCompare(b.title)
      );
    case "date":
      return listDataMovies.sort((a,b) =>
        new Date(a.release_date) -  new Date(a.release_date)
    );
     case "vote":
      return listDataMovies.sort((a,b) =>
        b.vote_average - a.vote_average
    );
    default:
      return listDataMovies;
  }
}, [data,sortOption]);

useEffect(() => {
  fetchNowPlaying();
},[]);

function handleSearchChange(query){
  console.log(query);
  //setSearchQuery(query);
  FetchSearch(query);
}

  return (
    <div className="App">
    <header className='header'>
      <p className='header-text'>Flixter</p>
      <SearchForm className="searchForm" onSearchChange={handleSearchChange}/>
      Sort by:
      <select value={sortOption} onChange={e=>setSortOption(e.target.value)} style={{marginLeft:16}}>
        <option value="title">Title (A-Z)</option>
        <option value="date">Release Date (newest)</option>
        <option value="vote">Average Vote (highest)</option>
      </select>
    </header>
    <main className='main-content'>
      {/*Populate MovieList with MovieCards and data from API*/}
      <MovieList data={sortedData} favorites={favorites} watched={watched} onToggleFavorite={toggleFavorite} onToggleWatched={toggleWatched}/>
      <MovieModal/>
      <button className="load-more-btn" onClick={() => setPage(page => page +1)}>
        Load More
      </button>
    </main>
    <SideBar favorites={favorites} watched={watched}/>
    </div>
  );
}
export default App
