import React from "react";
import ReactDOM from "react-dom";
import "./SearchForm.css"




function SearchForm( {onSearchChange}) {

  function handleSubmit(event){
  event.preventDefault();
  let searchQuery = event.target.elements.query.value;
  onSearchChange(searchQuery);
  event.target.reset();
  
}

  return (
        <form id="search-form-bar" onSubmit={handleSubmit}>
            <input type="search" name="query" placeholder="Search..."></input>
            <button type="submit">Search</button>
        </form>
  );
}



export default SearchForm;
