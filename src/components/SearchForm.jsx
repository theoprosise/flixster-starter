import React from "react";
import ReactDOM from "react-dom";
import "./SearchForm.css";

function SearchForm({ onSearchChange }) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
    onSearchChange(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearchChange(searchQuery);
  };

  const handleClear = (event) => {
    event.preventDefault();
    setSearchQuery("");
    onSearchChange("");
  };

  return (
    <form id="search-form-bar" onSubmit={handleSubmit}>
      <input
        type="search"
        name="query"
        value={searchQuery}
        onChange={handleChange}
        placeholder="Search..."
      />
      <button type="submit">Submit</button>
      <button type="button" onClick={handleClear}>
        Clear
      </button>
    </form>
  );
}

export default SearchForm;
