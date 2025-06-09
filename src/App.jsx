import { useEffect, useState } from 'react'
import './App.css'
import MovieList from './components/MovieList'
import SearchForm from './components/SearchForm'


const App = () => {

let [data, setMovieData] = useState([]);
let [page, setPage] = useState(1);
let [searchQuery, setSearchQuery] = useState("");

useEffect(() => {
  fetchNowPlaying();
}, [page])

const FetchSearch = async() =>{
    const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
    const url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}`;
    
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


useEffect(() => {
  fetchNowPlaying();
},[]);

function handleSearchChange(query){
  setSearchQuery(query);
  FetchSearch();
}

  return (
    <div className="App">
    <header className='header'>Flixter
      <SearchForm className="searchForm" onSearchChange={handleSearchChange}/>
    </header>
    <main>
      {/*Populate MovieList with MovieCards and data from API*/}
      
      <MovieList data={data}/>
      <button onClick={() => setPage(page => page +1)}>
        Load More
      </button>
    </main>
    </div>
  );
}
export default App
