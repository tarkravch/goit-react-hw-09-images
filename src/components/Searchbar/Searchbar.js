import React, { useState } from "react";
import "../Searchbar/Searchbar.scss";

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.currentTarget.value);
    console.log(query);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(query);
    setQuery("");
  };
  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          value={query}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
}
