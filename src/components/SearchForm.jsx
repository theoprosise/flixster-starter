import React from "react";
import ReactDOM from "react-dom";
import "./SearchForm.css"




function SearchForm( {onSearchChange}) {

  const handleChange= (event) =>{
  event.preventDefault();
  let searchQuery = event.target.value;
  onSearchChange(searchQuery);
  //event.target.reset();
}

const handleClear = (event) =>{
    onSearchChange("");
}

const handleSearch = (event) =>{
    onSearchChange("");
    let searchQuery = event.target.value;
    onSearchChange(searchQuery);
}

  return (
        <form id="search-form-bar">
            <input type="search" name="query" onChange={handleChange} onSubmit={handleChange} placeholder="Search..."></input>
            <button type="submit">Submit</button>
            <button type="submit">Clear</button>
        </form>
  );
}



export default SearchForm;
