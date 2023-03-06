import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeDetails from './pages/RecipeDetails';
import RecipeProvider from './context/RecipeProvider';

function App() {
  return (
    <div>
      <BrowserRouter>
        <RecipeProvider>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/meals">
            <Recipes />
          </Route>
          <Route path="/meals/:id">
            <RecipeDetails />
          </Route>
          <Route exact path="/drinks">
            <Recipes />
          </Route>
          <Route path="/drinks/:id">
            <RecipeDetails />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/done-recipes">
            <DoneRecipes />
          </Route>
          <Route exact path="/favorite-recipes">
            <FavoriteRecipes />
          </Route>
        </RecipeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
