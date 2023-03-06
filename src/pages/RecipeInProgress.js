import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export default function RecipeInProgress() {
  // pegar as infos do localstorage
  // fazer requisição
  // mostrar na tela
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [ingredientClass, setClass] = useState([]);
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
      const result = data[token][0];
      const keys = Object.keys(result);
      const ingredientsResult = Object.values(result).filter((ingredient, index) => {
        if (keys[index].includes('strIngredient')) {
          return ingredient;
        }
        return '';
      });
      console.log(ingredientsResult);
      setRecipe(data[token][0]);
      setIngredients(ingredientsResult);
      const newClass = ingredientsResult.map(() => '');
      setClass(newClass);
    };

    fetchApi();
  }, [id, web, token]);

  const share = () => {
    // const time = 2000;
    const text = `http://localhost:3000${history.location.pathname}`;
    navigator.clipboard.writeText(text);
    // setShareActive(true);
    // setTimeout(() => setShareActive(false), time);
  };

  const finishRecipe = () => {
    console.log('finish recipe');
  };

  const updateClass = (index) => {
    const classes = [...ingredientClass];
    console.log(classes);
    classes[index] = (classes[index] === '') ? 'strike' : '';
    const newClass = [...classes];
    setClass(newClass);
  };

  if (recipe && ingredients.length > 0) {
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
          {
            ingredients.map((ingredient, index) => {
              const key = index;
              return (
                <div key={ key }>
                  <label
                    className={ ingredientClass[index] }
                    data-testid={ `${index}-ingredient-step` }
                  >
                    <input
                      type="checkbox"
                      name="ingredient"
                      onClick={ () => updateClass(index) }
                      value={ ingredient }
                    />
                    { ingredient }
                  </label>
                </div>
              );
            })
          }
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
