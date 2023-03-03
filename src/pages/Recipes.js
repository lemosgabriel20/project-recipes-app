/* eslint-disable react/jsx-indent */
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipeContext';

export default function Recipes() {
  const { recipesSrc } = useContext(RecipesContext);
  const [loadRecipes, setLoadRecipes] = useState([]);
  const { pathname } = useLocation();
  const token = pathname.slice(1);
  const image = (token.includes('meals')) ? 'strMealThumb' : 'strDrinkThumb';
  const name = (token.includes('meals')) ? 'strMeal' : 'strDrink';
  const web = (token.includes('meals')) ? 'themealdb' : 'thecocktaildb';
  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(`https://www.${web}.com/api/json/v1/1/search.php?s=`);
      const data = await response.json();
      const limit = 12;
      setLoadRecipes(data[token].slice(0, limit));
    };
    fetchApi();
  }, [token, web]);

  const genericRecipes = (recipesSrc.length) ? recipesSrc : loadRecipes;
  return (
    <div>
      <Header />
      { genericRecipes.length ? (
        genericRecipes.map((recipe, index) => {
          const key = index;
          return (
            <div key={ key } data-testid={ `${index}-recipe-card` }>
              <img
                data-testid={ `${index}-card-img` }
                width="200px"
                src={ recipe[image] }
                alt=""
              />
              <h4 data-testid={ `${index}-card-name` }>{ recipe[name] }</h4>
            </div>
          );
        })
      ) : null }
      <Footer />
    </div>
  );
}
