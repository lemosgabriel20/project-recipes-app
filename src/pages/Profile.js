import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';

export default function Profile() {
  const history = useHistory();
  return (
    <div>
      <Header />
      <button type="button" onClick={ () => history.push('/done-recipes') }>
        Done Recipes
      </button>
    </div>
  );
}
