import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import DoneRecipes from '../pages/DoneRecipes';

Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: jest.fn().mockReturnValueOnce(Promise.resolve(42)),
  },
});

beforeEach(() => {
  window.history.pushState({}, '', '/');
});

describe('Testes em DoneRecipes', () => {
  test('Testa os botão Drinks', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <DoneRecipes />
      </Router>,
    );
    // acessar comida

    userEvent.click(screen.getByTestId('filter-by-drink-btn'));
    // acessar in progress
  });
  test('Testa o botão Meals', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <DoneRecipes />
      </Router>,
    );
    // acessar comida

    userEvent.click(screen.getByTestId('filter-by-meal-btn'));
    expect(screen.getByTestId('0-horizontal-share-btn')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('0-horizontal-share-btn'));
    // acessar in progress
  });
  test('Testa o botão All', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <DoneRecipes />
      </Router>,
    );
    // acessar comida

    userEvent.click(screen.getByTestId('filter-by-all-btn'));
    // acessar in progress
  });
});
