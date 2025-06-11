import { useEffect, useMemo, useState } from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import SearchForm from "./components/SearchForm";
import MovieModal from "./components/MovieModal";
import SideBar from "./components/Sidebar";
import Footer from "./components/Footer";

const App = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState("title");
  const [favorites, setFavorites] = useState([]);
  const [watched, setWatched] = useState([]);
  const [currentView, setCurrentView] = useState("home");
  const [data, setMovieData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleToggleSidebar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  //When load more is clicked, grab next page of data
  useEffect(() => {
    fetchNowPlaying();
  }, [page]);

  const fetchSearch = async (query) => {
    const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}`;

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

      const searchData = await res.json();
      setMovieData(searchData.results);
    } catch (err) {
      console.log("ERROR - check err");
    }
  };

  const fetchNowPlaying = async () => {
    const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
    const url = `https://api.themoviedb.org/3/movie/now_playing?&page=${page}`;

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
      console.log("HERE IS THE DATA" + [...data]);
      setMovieData((prev) =>
        page === 1 ? newData.results : [...data, ...newData.results]
      );
    } catch (err) {
      console.log("ERROR - check err");
    }
  };

  const toggleFavorite = (movie) => {
    setFavorites((favs) =>
      favs.find((m) => m.id === movie.id)
        ? favs.filter((m) => m.id !== movie.id)
        : [...favs, movie]
    );
  };

  const toggleWatched = (movie) => {
    setWatched((w) =>
      w.find((m) => m.id === movie.id)
        ? w.filter((m) => m.id !== movie.id)
        : [...w, movie]
    );
  };

  //Memoization to reduce redundant computing
  const sortedData = useMemo(() => {
    const listDataMovies = [...data];
    switch (sortOption) {
      case "title":
        return listDataMovies.sort((a, b) => a.title.localeCompare(b.title));
      case "date":
        return listDataMovies.sort(
          (a, b) => new Date(a.release_date) - new Date(a.release_date)
        );
      case "vote":
        return listDataMovies.sort((a, b) => b.vote_average - a.vote_average);
      default:
        return listDataMovies;
    }
  }, [data, sortOption]);

  useEffect(() => {
    fetchNowPlaying();
  }, []);

  function handleSearchChange(query) {
    //If user cleared box
    if (query === "") {
      setSearchQuery("");
      setCurrentView("home");
      setPage(1);
      setMovieData([]);
      fetchNowPlaying();
    } else {
      //Real search
      setSearchQuery(query);
      setCurrentView("home");
      setMovieData([]);
      fetchSearch(query);
    }
  }

  const displayedMovies = useMemo(() => {
    if (currentView == "favorites") {
      return favorites;
    }
    if (currentView == "watched") {
      return watched;
    }
    return sortedData;
  }, [currentView, sortedData, favorites, watched]);

  return (
    <div className="App">
      <header className="header">
        <p className="header-text">Flixter</p>
        <div className="header-info">
          <SearchForm
            className="searchForm"
            onSearchChange={handleSearchChange}
          />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            style={{ marginLeft: 16 }}
          >
            <option value="title">Title (A-Z)</option>
            <option value="date">Release Date (newest)</option>
            <option value="vote">Average Vote (highest)</option>
          </select>
          <button id="open-side-nav" onClick={handleToggleSidebar}>
            Open Sidebar
          </button>
        </div>
      </header>
      <main className="main-content">
        {/*Populate MovieList with MovieCards and data from API*/}
        <MovieList
          data={displayedMovies}
          favorites={favorites}
          watched={watched}
          onToggleFavorite={toggleFavorite}
          onToggleWatched={toggleWatched}
        />
        <MovieModal />
        {currentView == "home" && (
          <button
            className="load-more-btn"
            onClick={() => setPage((page) => page + 1)}
          >
            Load More
          </button>
        )}
      </main>
      <Footer />
      <SideBar
        isOpen={isSideBarOpen}
        onClose={handleToggleSidebar}
        onSelect={setCurrentView}
        favoritesCount={favorites.length}
        watchedCount={watched.length}
      />
    </div>
  );
};
export default App;
