import React from 'react';

export default function SearchBar() {
  return (
    <div>
      <label>
        <input
          data-testid="search-input"
          type="text"
          name="search"
        />
      </label>
      <label>
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          name="search"
        />
        Ingredient
      </label>
      <label>
        <input
          data-testid="name-search-radio"
          type="radio"
          name="search"
        />
        Name
      </label>
      <label>
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          name="search"
        />
        First letter
      </label>
      <button
        data-testid="exec-search-btn"
      >
        Search
      </button>
    </div>
  );
}
