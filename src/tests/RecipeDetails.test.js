import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

const start = 'start-recipe-btn';

afterEach(() => {
  window.history.pushState({}, '', '/');
});

Object.defineProperty(navigator, 'clipboard', {
  value: {
    // Provide mock implementation
    writeText: jest.fn().mockReturnValueOnce(Promise.resolve(42)),
  },
});

describe('Testa a página RecipeDetails', () => {
  it('Testes variados em /meals', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    console.log(window.location.pathname);
    userEvent.type(screen.getByTestId('email-input'), 'email@mail.com');
    userEvent.type(screen.getByTestId('password-input'), '1234567');
    userEvent.click(screen.getByTestId('login-submit-btn'));

    userEvent.click(screen.getByTestId('search-top-btn'));
    userEvent.click(screen.getByLabelText('Ingredient'));
    userEvent.click(screen.getByLabelText('First letter'));
    userEvent.click(screen.getByLabelText('Name'));

    userEvent.type(screen.getByTestId('search-input'), 'Arrabiata');
    userEvent.click(screen.getByTestId('exec-search-btn'));
    await waitFor(async () => {
      const favoriteId = 'favorite-btn';
      expect(window.location.pathname).toBe('/meals/52771');
      expect(screen.getByTestId(favoriteId)).toBeInTheDocument();
      userEvent.click(screen.getByTestId(favoriteId));
      userEvent.click(screen.getByTestId(favoriteId));
      expect(screen.getByTestId('share-btn')).toBeInTheDocument();
      await waitFor(() => {
        expect(screen.getByTestId('0-ingredient-name-and-measure')).toBeInTheDocument();
      }, { timeout: 3000 });
      expect(screen.getByTestId('instructions')).toBeInTheDocument();
      expect(screen.getByTestId(start)).toBeInTheDocument();
      userEvent.click(screen.getByTestId(start));
    }, { timeout: 4000 });
  });
  it('Testes variados em /drinks', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    console.log(window.location.pathname);
    userEvent.type(screen.getByTestId('email-input'), 'email@mail.com');
    userEvent.type(screen.getByTestId('password-input'), '1234567');
    userEvent.click(screen.getByTestId('login-submit-btn'));

    userEvent.click(screen.getByTestId('drinks-bottom-btn'));

    userEvent.click(screen.getByTestId('search-top-btn'));
    userEvent.click(screen.getByLabelText('Ingredient'));
    userEvent.click(screen.getByLabelText('First letter'));
    userEvent.click(screen.getByLabelText('Name'));

    userEvent.type(screen.getByTestId('search-input'), 'Aquamarine');
    userEvent.click(screen.getByTestId('exec-search-btn'));
    await waitFor(async () => {
      await waitFor(() => {
        userEvent.click(screen.getByTestId('share-btn'));
      }, { timeout: 4000 });
      expect(screen.getByTestId(start)).toBeInTheDocument();
      userEvent.click(screen.getByTestId(start));
    }, { timeout: 4000 });
  });
});
