import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import { useLocation, useHistory } from 'react-router-dom';
import FooterDetails from '../components/FooterDetails';
import { setInformations } from '../helpers/setInformations';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function RecipeDetails() {
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [recomendations, setRecomendations] = useState(null);
  const [drinks, setDrinks] = useState({});
  const [meals, setMeals] = useState({});
  const [storage, setStorage] = useState(false);
  const [icon, setIcon] = useState(whiteHeartIcon);
  const [favorites, setFavorites] = useState([]);
  const [shareActive, setShareActive] = useState(false);
  const { pathname } = useLocation();
  const history = useHistory();
  const [token, id, web, webRec, keyRec, image, imageRec,
    name, nameRec, category, instructions, youtube, n] = setInformations(pathname);

  const startRecipe = () => {
    if (token === 'meals') setMeals({ ...meals, [id]: ingredients });
    else setDrinks({ ...drinks, [id]: ingredients });
    setTimeout(() => history.push(`/${token}/${id}/in-progress`));
  };

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

  useEffect(() => {
    if (storage) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
      setStorage(false);
    }
  }, [storage, favorites]);

  const share = () => {
    const time = 2000;
    const text = `http://localhost:3000${history.location.pathname}`;
    navigator.clipboard.writeText(text);
    setShareActive(true);
    setTimeout(() => setShareActive(false), time);
  };

  useEffect(() => {
    if (localStorage.getItem('inProgressRecipes') !== null) {
      const obj = JSON.parse(localStorage.getItem('inProgressRecipes'));
      setDrinks(obj.drinks);
      setMeals(obj.meals);
    }
    // iniciar favorite
    if (localStorage.getItem('favoriteRecipes') !== null) {
      const list = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setFavorites(list);
    } else localStorage.setItem('favoriteRecipes', '[]');
  }, []);

  useEffect(() => {
    if (favorites !== undefined) {
      const string = JSON.stringify(favorites);
      if (string.includes(id)) setIcon(blackHeartIcon);
      else setIcon(whiteHeartIcon);
    }
  }, [favorites, id]);

  useEffect(() => {
    const obj = {
      drinks: {
        ...drinks,
      },
      meals: {
        ...meals,
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
  }, [drinks, meals]);

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
        <FooterDetails
          token={ token }
          meals={ meals }
          drinks={ drinks }
          id={ id }
          share={ share }
          startRecipe={ startRecipe }
          favorite={ favorite }
          icon={ icon }
          history={ history }
        />
        <img width="200px" data-testid="recipe-photo" src={ recipe[image] } alt="" />
        { shareActive ? <p>Link copied!</p> : null }
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
      </div>
    );
  }
  return null;
}
