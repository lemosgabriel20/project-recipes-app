import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

jest.mock('../__mocks__/fetchApi', () => {
  const result = '';
  return {
    meals: jest.fn().mockImplementation(() => [result]),
  };
});

Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: jest.fn().mockReturnValueOnce(Promise.resolve(42)),
  },
});

const emailId = 'email-input';
const email = 'email@mail.com';
const passwordId = 'password-input';
const login = 'login-submit-btn';
const firstLetter = 'First letter';
const searchTop = 'search-top-btn';
const searchInput = 'search-input';
const submit = 'exec-search-btn';

describe('', () => {
  test('', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    userEvent.type(screen.getByTestId(emailId), email);
    userEvent.type(screen.getByTestId(passwordId), '1234567');
    userEvent.click(screen.getByTestId(login));

    userEvent.click(screen.getByTestId(searchTop));
    userEvent.click(screen.getByLabelText('Ingredient'));
    userEvent.click(screen.getByLabelText(firstLetter));
    userEvent.click(screen.getByLabelText('Name'));

    userEvent.type(screen.getByTestId(searchInput), 'Arrabiata');
    userEvent.click(screen.getByTestId(submit));
    await waitFor(async () => {
      userEvent.click(screen.getByTestId('start-recipe-btn'));
    }, { timeout: 3000 });

    await waitFor(async () => {
      expect(window.location.pathname).toBe('/meals/52771/in-progress');
      expect(screen.getByTestId('share-btn')).toBeInTheDocument();
      userEvent.click(screen.getByTestId('share-btn'));
      const ingredient = '0-ingredient-step';
      expect(screen.getByTestId(ingredient)).toBeInTheDocument();
      userEvent.click(screen.getByTestId('0-ingredient-step'));
      userEvent.click(screen.getByTestId('1-ingredient-step'));
      userEvent.click(screen.getByTestId('2-ingredient-step'));
      userEvent.click(screen.getByTestId('3-ingredient-step'));
      userEvent.click(screen.getByTestId('4-ingredient-step'));
      userEvent.click(screen.getByTestId('5-ingredient-step'));
      userEvent.click(screen.getByTestId('6-ingredient-step'));
      userEvent.click(screen.getByTestId('7-ingredient-step'));

      userEvent.click(screen.getByTestId('favorite-btn'));

      expect(screen.getByTestId('finish-recipe-btn')).toBeInTheDocument();
      userEvent.click(screen.getByTestId('finish-recipe-btn'));
    }, { timeout: 2000 });
  });
});
