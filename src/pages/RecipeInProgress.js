import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export default function RecipeInProgress() {
  // pegar as infos do localstorage
  // fazer requisição
  // mostrar na tela
  const [recipe, setRecipe] = useState(null);
  const { pathname } = useLocation();
  const history = useHistory();
  const params = pathname.slice(1).split('/');
  const token = params[0];
  const id = params[1];
  const web = (token.includes('meals')) ? 'themealdb' : 'thecocktaildb';
  const image = (token.includes('meals')) ? 'strMealThumb' : 'strDrinkThumb';
  const name = (token.includes('meals')) ? 'strMeal' : 'strDrink';
  const category = (token.includes('meals')) ? 'strCategory' : 'strAlcoholic';

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(`https://www.${web}.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      console.log(data[token][0]);
      setRecipe(data[token][0]);
    };

    fetchApi();
  }, [id, web, token]);

  const share = () => {
    const time = 2000;
    const text = `http://localhost:3000${history.location.pathname}`;
    navigator.clipboard.writeText(text);
    setShareActive(true);
    setTimeout(() => setShareActive(false), time);
  };

  const finishRecipe = () => {
    console.log('finish recipe');
  };

  if (recipe) {
    return (
      <div>
        <div>
          <button
            data-testid="share-btn"
            onClick={ () => share() }
          >
            Share
          </button>
          <button
            data-testid="favorite-btn"
          >
            Favorite
          </button>
          <img
            data-testid="recipe-photo"
            src={ recipe[image] }
            alt=""
            width="200px"
          />
          <h1 data-testid="recipe-title">{ recipe[name] }</h1>
          <h3 data-testid="recipe-category">{ recipe[category] }</h3>
          <p data-testid="instructions">{ recipe.strInstructions }</p>
        </div>
        <button
          style={ { position: 'fixed', bottom: '0px', zIndex: '999' } }
          data-testid="finish-recipe-btn"
          onClick={ () => finishRecipe() }
          disabled
        >
          Finish Recipe
        </button>
      </div>
    );
  }
}
