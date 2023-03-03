import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testa componente SearchBar', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue('teste'),
    });
  });
  test('Testa interação dos elementos no componente SearchBar na url /meals', () => {
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
    userEvent.click(submit);

    const profile = screen.getByTestId('search-top-btn');
    userEvent.click(profile);
    const searchInput = screen.getByTestId('search-input');
    const radios = screen.getAllByRole('radio');
    const searchBtn = screen.getByTestId('exec-search-btn');
    userEvent.type(searchInput, 'avocado');
    userEvent.click(radios[0]);
    userEvent.click(radios[2]);
    userEvent.click(radios[1]);
    userEvent.click(searchBtn);
    expect(fetch).toHaveBeenCalled();
    userEvent.type(searchInput, 'a');
    userEvent.click(radios[2]);
    userEvent.click(searchBtn);
  });
  /* test('Testa interação dos elementos no componente SearchBar na url /drinks', () => {
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
    userEvent.click(submit);

    // Testar o mesmo só que para /drinks (o botão para as bebidas estará no footer)
  }); */
});
