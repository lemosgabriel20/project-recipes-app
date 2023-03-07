import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: jest.fn().mockReturnValueOnce(Promise.resolve(42)),
  },
});

beforeEach(() => {
  window.history.pushState({}, '', '/');
});

describe('Testes em DoneRecipes', () => {
  test('Testa os botões', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    // acessar conta
    userEvent.type(screen.getByTestId('email-input'), 'email@mail.com');
    userEvent.type(screen.getByTestId('password-input'), '12345678');
    userEvent.click(screen.getByTestId('login-submit-btn'));
    // acessar comida
    await waitFor(async () => {
      userEvent.click(screen.getByTestId('0-recipe-card'));
      console.log(window.location.pathname);
    });
    // acessar in progress
  });
});
