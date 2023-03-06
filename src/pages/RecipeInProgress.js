import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function RecipeInProgress() {
  // pegar as infos do localstorage
  // fazer requisição
  // mostrar na tela
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [ingredientClass, setClass] = useState([]);
  const [shareActive, setShareActive] = useState(false);
  const [storage, setStorage] = useState(false);
  const [icon, setIcon] = useState(whiteHeartIcon);
  const [favorites, setFavorites] = useState([]);
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
    if (localStorage.getItem('strike') === null) {
      localStorage.setItem('strike', '[]');
    } else {
      const obj = JSON.parse(localStorage.getItem('strike'));
      const found = obj.find((item) => item.id === id);
      if (found) {
        setClass(found.strike);
      }
    }
  }, [id]);

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes') !== null) {
      const list = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setFavorites(list);
    } else localStorage.setItem('favoriteRecipes', '[]');
  }, []);

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
      setRecipe(data[token][0]);
      setIngredients(ingredientsResult);
      const obj = JSON.parse(localStorage.getItem('strike'));
      const found = obj.find((item) => item.id === id);
      if (found === undefined) {
        const newClass = ingredientsResult.map(() => '');
        setClass(newClass);
      }
    };

    fetchApi();
  }, [id, web, token]);

  useEffect(() => {
    if (storage) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
      setStorage(false);
    }
  }, [storage, favorites]);

  useEffect(() => {
    if (favorites !== undefined) {
      const string = JSON.stringify(favorites);
      if (string.includes(id)) setIcon(blackHeartIcon);
      else setIcon(whiteHeartIcon);
    }
  }, [favorites, id]);

  const favorite = () => {
    const string = JSON.stringify(favorites);
    const obj = {
      id,
      type: (token === 'meals') ? 'meal' : 'drink',
      nationality: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe[name],
      image: recipe[image],
    };
    if (!string.includes(id)) {
      setFavorites([...favorites, obj]);
      setStorage(true);
    } else {
      const result = favorites.filter((rec) => rec.id !== id);
      setFavorites(result);
      setStorage(true);
    }
  };

  const share = () => {
    const time = 2000;
    const sliceVal = -12;
    const text = `http://localhost:3000${history.location.pathname.slice(0, sliceVal)}`;
    navigator.clipboard.writeText(text);
    setShareActive(true);
    setTimeout(() => setShareActive(false), time);
  };

  const finishRecipe = () => {
    console.log('finish recipe');
  };

  const updateClass = (index) => {
    const load = JSON.parse(localStorage.getItem('strike'));
    const classes = [...ingredientClass];
    classes[index] = (classes[index] === '') ? 'strike' : '';
    const newClass = [...classes];
    setClass(newClass);
    const list = { id, strike: newClass };
    if (JSON.stringify(load).includes(`"id":"${id}"`)) {
      const obj = [
        ...load,
      ];
      const found = obj.find((item) => item.id === id);
      const foundIdx = (obj.indexOf(found));
      obj[foundIdx] = list;
      localStorage.setItem('strike', JSON.stringify(obj));
    } else {
      const obj = [
        ...load,
        list,
      ];
      localStorage.setItem('strike', JSON.stringify(obj));
    }
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
            src={ icon }
            onClick={ () => favorite() }
          >
            Favorite
          </button>
          <img
            data-testid="recipe-photo"
            src={ recipe[image] }
            alt=""
            width="200px"
          />
          { shareActive ? <p>Link copied!</p> : null }
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
                      defaultChecked={ (ingredientClass[index] === 'strike') }
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
          disabled={ ingredientClass.includes('') }
        >
          Finish Recipe
        </button>
      </div>
    );
  }
}
