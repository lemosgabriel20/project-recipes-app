import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipeContext';

export default function Recipes() {
  const { recipesSrc } = useContext(RecipesContext);
  const [loadRecipes, setLoadRecipes] = useState([]);
  const [activeFilter, setActiveFilter] = useState([]);
  const [categories, setCategories] = useState([]);
  const { pathname } = useLocation();
  const token = pathname.slice(1);
  const image = (token.includes('meals')) ? 'strMealThumb' : 'strDrinkThumb';
  const name = (token.includes('meals')) ? 'strMeal' : 'strDrink';
  const web = (token.includes('meals')) ? 'themealdb' : 'thecocktaildb';

  useEffect(() => {
    const fetchFoods = async () => {
      const response = await fetch(`https://www.${web}.com/api/json/v1/1/search.php?s=`);
      const data = await response.json();
      const limit = 12;
      setLoadRecipes(data[token].slice(0, limit));
    };

    const fetchCategories = async () => {
      const response = await fetch(`https://www.${web}.com/api/json/v1/1/list.php?c=list`);
      const data = await response.json();
      const limit = 5;
      setCategories((data[token].slice(0, limit)));
    };
    fetchFoods();
    fetchCategories();
  }, [token, web]);

  const handleFilter = (category) => {
    setActiveFilter(category);
    console.log(category);
    let url = `https://www.${web}.com/api/json/v1/1/filter.php?c=${category}`;
    if (category === 'All' || category === activeFilter) url = `https://www.${web}.com/api/json/v1/1/search.php?s=`;
    const fetchFoods = async () => {
      const response = await fetch(url);
      const data = await response.json();
      const limit = 12;
      setLoadRecipes(data[token].slice(0, limit));
    };
    fetchFoods();
  };

  const genericRecipes = (recipesSrc.length) ? recipesSrc : loadRecipes;
  return (
    <div>
      <Header />
      {/* Cateogries */}
      {
        categories.length ? (
          categories.map((category, index) => {
            const key = index;
            return (
              <button
                key={ key }
                value={ category.strCategory }
                data-testid={ `${category.strCategory}-category-filter` }
                onClick={ () => handleFilter(category.strCategory) }
              >
                {category.strCategory}
              </button>
            );
          })
        ) : null
      }
      <button
        data-testid="All-category-filter"
        value="All"
        onClick={ () => handleFilter('All') }
      >
        All
      </button>
      { /* Foods */ }
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
