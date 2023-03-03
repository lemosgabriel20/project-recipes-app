import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import App from '../App';
import Profile from '../pages/Profile';

describe('Testa tela de Profile', () => {
  test('Testa se elementos existem na tela de Login', () => {
    render(<Profile />);
    const doneBtn = screen.getByTestId('profile-done-btn');
    const favoriteBtn = screen.getByTestId('profile-favorite-btn');
    const logoutBtn = screen.getByTestId('profile-logout-btn');
    expect(favoriteBtn).toBeInTheDocument();
    expect(doneBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
  });

  test('Testa mudança de rota', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Profile />
      </Router>,
    );

    const favoriteBtn = screen.getByTestId('profile-favorite-btn');
    userEvent.click(favoriteBtn);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });
});
