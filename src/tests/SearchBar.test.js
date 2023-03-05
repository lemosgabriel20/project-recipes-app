import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

jest.mock('../__mocks__/fetchFoods', () => {
  const result = '';
  return {
    meals: jest.fn().mockImplementation(() => [result]),
  };
});

jest.mock('../__mocks__/fetchApi', () => {
  const result = '';
  return {
    meals: jest.fn().mockImplementation(() => [result]),
  };
});

window.alert = jest.fn();

afterEach(() => {
  window.history.pushState({}, '', '/');
});

const emailId = 'email-input';
const email = 'email@mail.com';
const passwordId = 'password-input';
const login = 'login-submit-btn';
const firstLetter = 'First letter';
const searchTop = 'search-top-btn';
const searchInput = 'search-input';
const submit = 'exec-search-btn';
const drinks = 'drinks-bottom-btn';

describe('Testa componente SearchBar', () => {
  test('Testa se achado 1 receita é levada para página de detalhes em meals', async () => {
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
    await waitFor(() => {
      expect(window.location.pathname).toBe('/meals/52771');
    });
  });
  test('Testa o alert do input first letter', async () => {
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

    userEvent.type(screen.getByTestId(searchInput), 'Aa');
    userEvent.click(screen.getByTestId(submit));
  });
  test('Testa o input first letter', async () => {
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
    userEvent.click(screen.getByLabelText(firstLetter));

    userEvent.type(screen.getByTestId(searchInput), 'A');
    userEvent.click(screen.getByTestId(submit));
  });
  test('Testa o input ingredient', async () => {
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
    userEvent.click(screen.getByLabelText(firstLetter));
    userEvent.click(screen.getByLabelText('Ingredient'));

    userEvent.type(screen.getByTestId(searchInput), 'A');
    userEvent.click(screen.getByTestId(submit));
  });
  test('Testa o input name e se carregam as 12 receitas', async () => {
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

    userEvent.type(screen.getByTestId(searchInput), 'A');
    userEvent.click(screen.getByTestId(submit));

    await waitFor(() => expect(screen.getByTestId('11-recipe-card')).toBeInTheDocument());
  });
  test('Testa o alert se caso nenhuma receita for acahda', async () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
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

    userEvent.type(screen.getByTestId(searchInput), 'xablau');
    userEvent.click(screen.getByTestId(submit));
    await waitFor(() => expect(alertMock).toHaveBeenCalled());
  });

  test('Testa o input name em drinks', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    userEvent.type(screen.getByTestId(emailId), email);
    userEvent.type(screen.getByTestId(passwordId), '1234567');
    userEvent.click(screen.getByTestId(login));

    userEvent.click(screen.getByTestId(drinks));

    userEvent.click(screen.getByTestId(searchTop));
    userEvent.click(screen.getByLabelText('Ingredient'));
    userEvent.click(screen.getByLabelText(firstLetter));
    userEvent.click(screen.getByLabelText('Name'));

    userEvent.type(screen.getByTestId(searchInput), 'A');
    userEvent.click(screen.getByTestId(submit));
  });

  test('Testa se achado 1 receita é levada para página de detalhes em drinks', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    userEvent.type(screen.getByTestId(emailId), email);
    userEvent.type(screen.getByTestId(passwordId), '1234567');
    userEvent.click(screen.getByTestId(login));

    userEvent.click(screen.getByTestId(drinks));

    userEvent.click(screen.getByTestId(searchTop));
    userEvent.click(screen.getByLabelText('Ingredient'));
    userEvent.click(screen.getByLabelText(firstLetter));
    userEvent.click(screen.getByLabelText('Name'));

    userEvent.type(screen.getByTestId(searchInput), 'Aquamarine');
    userEvent.click(screen.getByTestId(submit));
    await waitFor(() => {
      expect(window.location.pathname).toBe('/drinks/178319');
    });
  });

  test('Testa o input letter em drinks', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    userEvent.type(screen.getByTestId(emailId), email);
    userEvent.type(screen.getByTestId(passwordId), '1234567');
    userEvent.click(screen.getByTestId(login));

    userEvent.click(screen.getByTestId(drinks));

    userEvent.click(screen.getByTestId(searchTop));
    userEvent.click(screen.getByLabelText('Ingredient'));
    userEvent.click(screen.getByLabelText('Name'));
    userEvent.click(screen.getByLabelText(firstLetter));

    userEvent.type(screen.getByTestId(searchInput), 'A');
    userEvent.click(screen.getByTestId(submit));
    await waitFor(() => {
      expect(window.location.pathname).toBe('/drinks');
    });
  });
  test('Testa o input ingredient em drinks', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    userEvent.type(screen.getByTestId(emailId), email);
    userEvent.type(screen.getByTestId(passwordId), '1234567');
    userEvent.click(screen.getByTestId(login));

    userEvent.click(screen.getByTestId(drinks));

    userEvent.click(screen.getByTestId(searchTop));
    userEvent.click(screen.getByLabelText('Name'));
    userEvent.click(screen.getByLabelText(firstLetter));
    userEvent.click(screen.getByLabelText('Ingredient'));

    userEvent.type(screen.getByTestId(searchInput), 'A');
    userEvent.click(screen.getByTestId(submit));
    await waitFor(() => {
      expect(window.location.pathname).toBe('/drinks');
    });
  });
});
