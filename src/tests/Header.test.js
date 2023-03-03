import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import Meals from '../pages/Meals';
import App from '../App';

const profileId = 'profile-top-btn';
const searchId = 'search-top-btn';
const titleId = 'page-title';

describe('Testa componente Header', () => {
  test('Testa se elementos existem na tela de Header', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Meals />
      </Router>,
    );
    const profile = screen.getByTestId(profileId);
    const search = screen.getByTestId(searchId);
    const title = screen.getByTestId(titleId);
    expect(profile).toBeInTheDocument();
    expect(search).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

  test('Testa mudança de rota no Header', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Meals />
      </Router>,
    );
    const profile = screen.getByTestId(profileId);
    const search = screen.getByTestId(searchId);
    const title = screen.getByTestId(titleId);

    userEvent.click(profile);

    expect(title).toHaveTextContent('Profile');
    expect(search).not.toBeInTheDocument();
    expect(history.location.pathname).toBe('/profile');
  });

  test('Testa mudança de rota(com hífen) no Header', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const submit = screen.getByTestId('login-submit-btn');
    userEvent.type(email, 'email@mail.com');
    userEvent.type(password, '1234567');
    expect(submit).toBeEnabled();
    userEvent.click(submit);
    const profile = screen.getByTestId(profileId);
    userEvent.click(profile);
    const title = screen.getByTestId(titleId);
    const doneRecipes = screen.getByText('Done Recipes');
    expect(title).toHaveTextContent('Profile');
    expect(doneRecipes).toBeInTheDocument();
    userEvent.click(doneRecipes);
    const doneTitle = screen.getByTestId(titleId);
    expect(doneTitle).toHaveTextContent('Done Recipes');
    expect(window.location.pathname).toBe('/done-recipes');
  });
  test('Testa se o input de pesquisa aparece', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Meals />
      </Router>,
    );
    const search = screen.getByTestId(searchId);
    expect(search).toBeInTheDocument();
    userEvent.click(search);
    const input = screen.getByTestId('search-input');
    expect(input).toBeInTheDocument();
  });
});
