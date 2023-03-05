import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Details() {
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const { pathname } = useLocation();
  const params = pathname.slice(1).split('/');
  const token = params[0];
  const id = params[1];
  const web = (token.includes('meals')) ? 'themealdb' : 'thecocktaildb';
  const webRec = (token.includes('meals')) ? 'thecocktaildb' : 'themealdb';
  const keyRec = (token.includes('meals')) ? 'drinks' : 'meals';
  const image = (token.includes('meals')) ? 'strMealThumb' : 'strDrinkThumb';
  const name = (token.includes('meals')) ? 'strMeal' : 'strDrink';
  const category = (token.includes('meals')) ? 'strCategory' : 'strAlcoholic';
  const instructions = 'strInstructions';
  const youtube = 'strYoutube';

  useEffect(() => {
    const fetchById = async () => {
      const response = await fetch(`https://www.${web}.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setRecipe(data[token][0]);
    };
    fetchById();
  }, [id, token, web]);

  useEffect(() => {
    const fetchRecomendation = async () => {
      const response = await fetch(`https://www.${webRec}.com/api/json/v1/1/search.php?s=`);
      const data = await response.json();
      console.log(data[keyRec][0]);
      setRecomendations(data[keyRec][0]);
      console.log(recomendations);
    };
    fetchRecomendation();
  }, [keyRec, webRec, token, recomendations]);

  useEffect(() => {
    if (recipe) {
      const fetchCategories = async () => {
        const response = await fetch(`https://www.${web}.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        const dataFormatted = data[token][0];
        const keys = Object.keys(dataFormatted);
        const values = Object.values(dataFormatted);
        const ingredientsResult = values.filter((ingredient, index) => {
          if (keys[index].includes('strIngredient')) {
            return ingredient;
          }
          return '';
        });
        const measureResult = values.filter((measure, index) => {
          if (keys[index].includes('strMeasure')) {
            return measure;
          }
          return '';
        });
        setIngredients(ingredientsResult);
        setMeasures(measureResult);
      };
      fetchCategories();
    }
  }, [recipe, token, id, web]);

  if (recipe) {
    return (
      <div>
        <img width="200px" data-testid="recipe-photo" src={ recipe[image] } alt="" />
        <h1 data-testid="recipe-title">{ recipe[name] }</h1>
        <h4 data-testid="recipe-category">{ recipe[category] }</h4>
        {
          ingredients.map((ingredient, index) => {
            const key = index;
            return (
              <div
                key={ key }
                data-testid={ `${key}-ingredient-name-and-measure` }
              >
                { `${ingredient} ${measures[key]}` }
              </div>
            );
          })
        }
        <p data-testid="instructions">{ recipe[instructions] }</p>
        <iframe
          data-testid="video"
          title="Video"
          src={ recipe[youtube] }
          frameBorder="0"
          allowFullScreen
        />
      </div>
    );
  }
}
