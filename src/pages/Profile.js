import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  const history = useHistory();
  return (
    <div>
      <Header />
      <button type="button" onClick={ () => history.push('/done-recipes') }>
        Done Recipes
      </button>
      <Footer />
    </div>
  );
}
