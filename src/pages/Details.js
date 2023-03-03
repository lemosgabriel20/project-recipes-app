import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Details() {
  const [recipe, setRecipe] = useState();
  const { pathname } = useLocation();
  const params = pathname.slice(1).split('/');
  const token = params[0];
  const id = params[1];
  const web = (token.includes('meals')) ? 'themealdb' : 'thecocktaildb';
  useEffect(() => {
    const fetchById = async () => {
      const response = await fetch(`https://www.${web}.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setRecipe(data[token]);
    };
    fetchById();
  }, [id, token, web]);
  return (
    <div>{console.log(recipe)}</div>
  );
}
