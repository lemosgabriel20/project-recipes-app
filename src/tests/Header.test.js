import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import App from '../App';

const profileId = 'profile-top-btn';
const searchId = 'search-top-btn';
const titleId = 'page-title';

let container;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe('Testa componente Header', () => {
  test('Testa se elementos existem na tela de Header', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Header />
      </Router>,
    );
    const profile = screen.getByTestId(profileId);
    const search = screen.getByTestId(searchId);
    const title = screen.getByTestId(titleId);
    expect(profile).toBeInTheDocument();
    expect(search).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
  test('Testa click do botão profile', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Header />
      </Router>,
    );
    const profile = screen.getByTestId(profileId);
    userEvent.click(profile);
  });
  test('Testa click do botão de abrir pesquisa', () => {
    const history = createMemoryHistory();
    act(() => {
      render(
        (
          <Router history={ history }>
            <App />
          </Router>
        ), container,
      );
    });
    userEvent.type(screen.getByTestId('email-input'), 'email@mail.com');
    userEvent.type(screen.getByTestId('password-input'), '1234567');
    userEvent.click(screen.getByTestId('login-submit-btn'));

    userEvent.click(screen.getByTestId('search-top-btn'));
    userEvent.type(screen.getByTestId('search-input'), 'A');
  });
});
