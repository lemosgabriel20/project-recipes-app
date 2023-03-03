import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import Meals from '../pages/Meals';

const mealsId = 'meals-bottom-btn';
const drinksId = 'drinks-bottom-btn';
const titleId = 'page-title';

describe('Testa componente Footer', () => {
  test('Testa se elementos de Footer existem', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Meals />
      </Router>,
    );

    const meals = screen.getByTestId(mealsId);
    const drinks = screen.getByTestId(drinksId);

    expect(meals).toBeInTheDocument();
    expect(drinks).toBeInTheDocument();
  });

  test('Testa mudança de rota no Footer', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Meals />
      </Router>,
    );

    const meals = screen.getByTestId(mealsId);
    const drinks = screen.getByTestId(drinksId);
    const title = screen.getByTestId(titleId);

    userEvent.click(drinks);

    expect(title).toHaveTextContent('Drinks');
    expect(history.location.pathname).toBe('/drinks');

    userEvent.click(meals);

    expect(title).toHaveTextContent('Meals');
    expect(history.location.pathname).toBe('/meals');
  });
});
