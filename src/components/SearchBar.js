import React, { useState } from 'react';

export default function SearchBar() {
  const [search, setSearch] = useState('');
  const [endpoint, setEndpoint] = useState('');

  const checkEndpoint = () => {
    if (endpoint === 'ingredient') return `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`;
    if (endpoint === 'name') return `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
    if (endpoint === 'letter') return `https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`;
  };

  const fetchApi = async () => {
    const url = checkEndpoint();
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.meals);
  };

  return (
    <div>
      <label>
        <input
          data-testid="search-input"
          type="text"
          name="search"
          onChange={ (evt) => setSearch(evt.target.value) }
        />
      </label>
      <label>
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          name="search"
          onClick={ () => setEndpoint('ingredient') }
        />
        Ingredient
      </label>
      <label>
        <input
          data-testid="name-search-radio"
          type="radio"
          name="search"
          onClick={ () => setEndpoint('name') }
        />
        Name
      </label>
      <label>
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          name="search"
          onClick={ () => setEndpoint('letter') }
        />
        First letter
      </label>
      <button
        data-testid="exec-search-btn"
        disabled={ endpoint === '' }
        onClick={ () => {
          if (endpoint === 'letter' && search.length > 1) {
            global.alert('Your search must have only 1 (one) character');
          }
          fetchApi();
        } }
      >
        Search
      </button>
    </div>
  );
}
