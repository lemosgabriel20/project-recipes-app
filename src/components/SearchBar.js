import React, { useContext, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipeContext';

export default function SearchBar() {
  const { setRecipeSrc } = useContext(RecipesContext);
  const [search, setSearch] = useState('');
  const [endpoint, setEndpoint] = useState('');
  const location = useLocation();
  const history = useHistory();
  const { pathname } = location;
  const token = pathname.slice(1);
  const id = (token.includes('meals')) ? 'idMeal' : 'idDrink';

  const checkEndpoint = () => {
    // if meals
    if (pathname === '/meals') {
      if (endpoint === 'ingredient') return [`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`, 'meals'];
      if (endpoint === 'name') return [`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`, 'meals'];
      if (endpoint === 'letter') return [`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`, 'meals'];
    }
    // if drinks
    if (pathname === '/drinks') {
      if (endpoint === 'ingredient') return [`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`, 'drinks'];
      if (endpoint === 'name') return [`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`, 'drinks'];
      if (endpoint === 'letter') return [`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`, 'drinks'];
    }

    return ['', ''];
  };

  const fetchApi = async (url, key) => {
    const response = await fetch(url);
    const data = await response.json();
    return data[key];
  };

  const handleSearch = async () => {
    const [url, key] = checkEndpoint();
    if (endpoint === 'letter' && search.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const food = await fetchApi(url, key);
      if (food === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
        return null;
      }
      if (food.length === 1) {
        const newUrl = `/${token}/${food[0][id]}`;
        history.push(newUrl);
      }
      if (food.length !== 1) {
        const limit = 12;
        const newRecipes = food.slice(0, limit);
        setRecipeSrc(newRecipes);
      }
    }
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
        onClick={ () => handleSearch() }
      >
        Search
      </button>
    </div>
  );
}
