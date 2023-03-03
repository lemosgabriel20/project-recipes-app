import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipeContext';

export default function RecipeProvider({ children }) {
  const [recipesSrc, setRecipeSrc] = useState([]);
  const obj = useMemo(
    () => ({
      recipesSrc,
      setRecipeSrc,
    }),
    [recipesSrc, setRecipeSrc],
  );
  return (
    <RecipesContext.Provider value={ obj }>
      <div>{ children }</div>
    </RecipesContext.Provider>
  );
}
RecipeProvider.propTypes = {
  children: PropTypes.any,
}.isRequired;
