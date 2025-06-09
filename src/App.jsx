import { useEffect, useState } from 'react'
import './App.css'
import MovieList from '../MovieList'

const App = () => {

let [data, setMovieData] = useState([]);

useEffect(() => {
  const fetchNowPlaying = async () => {
    const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
    const url = "https://api.themoviedb.org/3/movie/now_playing";
    
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

      const data = await res.json();
      setMovieData(data.results);

    }
    catch(err){
      console.log("ERROR - check err");
    }

  };

  fetchNowPlaying();
},[]);



  return (
    <div className="App">
    <header className='header'>Flixter</header>
    <main>
      {/*Populate MovieList with MovieCards and data from API*/}
      
      <MovieList data={data}/>
    </main>
    </div>
  );
}
export default App
