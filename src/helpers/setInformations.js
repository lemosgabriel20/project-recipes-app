export const setInformations = (pathname) => {
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
  const n = [];
  const nine = 9;
  for (let i = 0; i <= nine; i += 1) n.push(i);
  return [token, id, web, webRec, keyRec, image,
    imageRec, name, nameRec, category, instructions, youtube, n];
};
