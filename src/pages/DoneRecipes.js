import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

export default function DoneRecipes() {
  const [recipes, setRecipes] = useState(JSON.parse(localStorage.getItem('doneRecipes')));
  const [allRecipes, setAllRecipes] = useState([]);
  const [shareActive, setShareActive] = useState(false);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('doneRecipes'));
    if (local !== undefined) {
      setAllRecipes(local);
    }
  }, [recipes]);

  const findMeals = (list) => {
    const toFind = (list === null) ? [] : list;
    const meals = toFind.filter((recipe) => recipe.type === 'meal');
    setRecipes(meals);
  };

  const findDrinks = (list) => {
    const toFind = (list === null) ? [] : list;
    const drinks = toFind.filter((recipe) => recipe.type === 'drink');
    setRecipes(drinks);
  };

  const share = (type, id) => {
    const time = 2000;
    const text = `http://localhost:3000/${type}s/${id}`;
    navigator.clipboard.writeText(text);
    setShareActive(true);
    setTimeout(() => setShareActive(false), time);
  };

  if (recipes) {
    return (
      <div>
        <Header />
        <button
          onClick={ () => setRecipes(allRecipes) }
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          onClick={ () => findMeals(allRecipes) }
          data-testid="filter-by-meal-btn"
        >
          Meals
        </button>
        <button
          onClick={ () => findDrinks(allRecipes) }
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
        { recipes.length > 0 ? (
          recipes.map((recipe, index) => {
            const key = index;
            const tags = [...recipe.tags];
            return (
              <div key={ key }>
                <img
                  src={ recipe.image }
                  alt=""
                  data-testid={ `${index}-horizontal-image` }
                  width="200px"
                />
                <h1 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h1>
                <h2
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {
                    recipe.type === 'meal' ? (
                      `${recipe.nationality} - ${recipe.category}`
                    ) : `${recipe.alcoholicOrNot}`
                  }
                </h2>
                <h3
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  {recipe.doneDate}
                </h3>
                <button
                  src={ shareIcon }
                  data-testid={ `${index}-horizontal-share-btn` }
                  onClick={ () => share(recipe.type, recipe.id) }
                >
                  Share
                </button>
                { shareActive ? <p>Link copied!</p> : null }
                {
                  (tags).map((tag, i) => {
                    const k = i;
                    return (
                      <p
                        key={ k }
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                      >
                        {tag}
                      </p>
                    );
                  })
                }
              </div>
            );
          })) : null }
      </div>
    );
  }
  return (
    <div>
      <Header />
      <button
        onClick={ () => setRecipes([]) }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        onClick={ () => findMeals([{ type: 'meal', tags: [''] }]) }
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        onClick={ () => findDrinks([{ type: 'drink', tags: [''] }]) }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
    </div>
  );
}
