import React, { useState } from 'react';

function SearchForm({ searchFor, type = "companies" }) {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    searchFor(searchTerm ? { [type === "companies" ? "name" : "title"]: searchTerm } : {});
    setSearchTerm("");
  }

  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  return (
    <div className="SearchForm mb-4">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            className="form-control"
            name="searchTerm"
            placeholder="Enter search term..."
            value={searchTerm}
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;