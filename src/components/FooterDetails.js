import React from 'react';
import PropTypes from 'prop-types';

export default function FooterDetails({ token, meals, drinks, id, share, startRecipe,
  favorite, icon, history }) {
  return (
    <div>
      {
        !Object.keys(token === 'meals' ? meals : drinks).includes(id) ? (
          <button
            style={ { position: 'fixed', bottom: '0px', zIndex: '999' } }
            data-testid="start-recipe-btn"
            onClick={ () => startRecipe() }
          >
            Start Recipe
          </button>)
          : (
            <button
              style={ { position: 'fixed', bottom: '0px', zIndex: '999' } }
              data-testid="start-recipe-btn"
              onClick={ () => history.push(`/${token}/${id}/in-progress`) }
            >
              Continue Recipe
            </button>)
      }
      <button
        data-testid="share-btn"
        onClick={ () => share() }
      >
        Share
      </button>
      <button
        src={ icon }
        data-testid="favorite-btn"
        onClick={ () => favorite() }
      >
        Favorite
      </button>
    </div>
  );
}

FooterDetails.propTypes = {
  token: PropTypes.any,
}.isRequired;
