import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/meals">
            <Meals />
          </Route>
          <Route path="/drinks">
            <Drinks />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/done-recipes">
            <DoneRecipes />
          </Route>
          <Route path="/favorite-recipes">
            <FavoriteRecipes />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
