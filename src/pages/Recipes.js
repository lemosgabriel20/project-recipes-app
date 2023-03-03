/* eslint-disable react/jsx-indent */
import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipeContext';

export default function Recipes() {
  const { recipesSrc } = useContext(RecipesContext);
  const { pathname } = useLocation();
  const token = pathname.slice(1);
  const image = (token.includes('meals')) ? 'strMealThumb' : 'strDrinkThumb';
  const name = (token.includes('meals')) ? 'strMeal' : 'strDrink';

  return (
    <div>
      <Header />
      { recipesSrc.length ? (
        recipesSrc.map((recipe, index) => {
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
