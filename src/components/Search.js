import React, { useState } from "react";

function Search({ onSearch }) {
  const [query, setQuery] = useState("");

  // Handle changes to the search input
  const handleSearchChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery); // Pass the query to the parent component
  };

  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        value={query}
        onChange={handleSearchChange}
      />
    </div>
  );
}

export default Search;