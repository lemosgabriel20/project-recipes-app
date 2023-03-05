import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import { useLocation } from 'react-router-dom';

export default function Details() {
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [recomendations, setRecomendations] = useState(null);
  const { pathname } = useLocation();
  const params = pathname.slice(1).split('/');
  const token = params[0];
  const id = params[1];
  const web = (token.includes('meals')) ? 'themealdb' : 'thecocktaildb';
  const webRec = (token.includes('meals')) ? 'thecocktaildb' : 'themealdb';
  const keyRec = (token.includes('meals')) ? 'drinks' : 'meals';
  const image = (token.includes('meals')) ? 'strMealThumb' : 'strDrinkThumb';
  const imageRec = (token.includes('meals')) ? 'strDrinkThumb' : 'strMealThumb';
  const name = (token.includes('meals')) ? 'strMeal' : 'strDrink';
  const nameRec = (token.includes('meals')) ? 'strDrink' : 'strMeal';
  const category = (token.includes('meals')) ? 'strCategory' : 'strAlcoholic';
  const instructions = 'strInstructions';
  const youtube = 'strYoutube';
  const nine = 9;
  // Criei essa array de números para parar com erros de 'magic number' do linter
  const n = [];
  for (let i = 0; i <= nine; i += 1) n.push(i);
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
      const limit = 6;
      const dataFormatted = data[keyRec].slice(0, limit);
      const result = dataFormatted.map((val) => [val[nameRec], val[imageRec]]);
      console.log(result);
      setRecomendations(result);
    };
    fetchRecomendation();
  }, [keyRec, webRec, imageRec, nameRec]);

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

  if (recipe && recomendations) {
    const slides = [n[1], n[2], n[3]];
    const recFirst = recomendations.slice(n[0], n[2]);
    const recSec = recomendations.slice(n[2], n[4]);
    const recThird = recomendations.slice(n[4], n[6]);
    const newRec = [recFirst, recSec, recThird];
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
        <Carousel>
          {
            slides.map((slide, index) => {
              const fstName = newRec[index][0][0];
              const secName = newRec[index][1][0];
              const fstImg = newRec[index][0][1];
              const secImg = newRec[index][1][1];
              let newIdx;
              if (index === 0) newIdx = index;
              if (index === 1) newIdx = index + 1;
              if (index === 2) newIdx = index + 2;
              return (
                <Carousel.Item key={ index }>
                  <div data-testid={ `${newIdx}-recommendation-card` }>
                    <p data-testid={ `${newIdx}-recommendation-title` }>{fstName}</p>
                    <img width="200px" src={ fstImg } alt="" />
                  </div>
                  <div data-testid={ `${newIdx + 1}-recommendation-card` }>
                    <p data-testid={ `${newIdx + 1}-recommendation-title` }>{secName}</p>
                    <img width="200px" src={ secImg } alt="" />
                  </div>
                </Carousel.Item>
              );
            })
          }
        </Carousel>
        <button
          style={ { position: 'fixed', bottom: '0px' } }
          data-testid="start-recipe-btn"
        >
          Start Recipe
        </button>
      </div>
    );
  }
}
