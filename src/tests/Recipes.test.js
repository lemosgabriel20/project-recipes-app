import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

jest.mock('../__mocks__/fetchFoods_recipes', () => {
  const result = '';
  return {
    meals: jest.fn().mockImplementation(() => [result]),
  };
});

afterEach(() => {
  window.history.pushState({}, '', '/');
});

describe('Testa componente Recipes', () => {
  test('Testa interação com uma categoria', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    userEvent.type(screen.getByTestId('email-input'), 'email@mail.com');
    userEvent.type(screen.getByTestId('password-input'), '1234567');
    userEvent.click(screen.getByTestId('login-submit-btn'));
    await waitFor(() => userEvent.click(screen.getByTestId('Beef-category-filter')));
  });
  test('Testa interação com reset de categoria All', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    userEvent.type(screen.getByTestId('email-input'), 'email@mail.com');
    userEvent.type(screen.getByTestId('password-input'), '1234567');
    userEvent.click(screen.getByTestId('login-submit-btn'));
    await waitFor(() => {
      userEvent.click(screen.getByTestId('All-category-filter'));
    });
  });
});
