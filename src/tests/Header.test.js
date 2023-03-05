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

afterEach(() => {
  window.history.pushState({}, '', '/');
});

describe('Testa componente Header', () => {
  test('Testa se elementos existem na tela de Header', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Header />
      </Router>,
    );
    expect(screen.getByTestId(profileId)).toBeInTheDocument();
    expect(screen.getByTestId(searchId)).toBeInTheDocument();
    expect(screen.getByTestId(titleId)).toBeInTheDocument();
  });
  test('Testa click do botão profile', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Header />
      </Router>,
    );
    userEvent.click(screen.getByTestId(profileId));
  });
  test('Testa click do botão de abrir pesquisa', () => {
    const history = createMemoryHistory();
    act(() => {
      render(
        (
          <Router history={ history }>
            <App />
          </Router>
        ),
      );
    });
    userEvent.type(screen.getByTestId('email-input'), 'email@mail.com');
    userEvent.type(screen.getByTestId('password-input'), '1234567');
    userEvent.click(screen.getByTestId('login-submit-btn'));

    userEvent.click(screen.getByTestId('search-top-btn'));
    userEvent.type(screen.getByTestId('search-input'), 'A');
  });
  test('Testa click do botão de abrir pesquisa', async () => {
    const history = createMemoryHistory();
    act(() => {
      render(
        (
          <Router history={ history }>
            <App />
          </Router>
        ),
      );
    });
    userEvent.type(screen.getByTestId('email-input'), 'email@mail.com');
    userEvent.type(screen.getByTestId('password-input'), '1234567');
    userEvent.click(screen.getByTestId('login-submit-btn'));
    userEvent.click(screen.getByTestId('profile-top-btn'));
    userEvent.click(screen.getByTestId('profile-done-btn'));
  });
});
