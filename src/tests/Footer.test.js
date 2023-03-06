import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import Footer from '../components/Footer';

describe('Testa componente Footer', () => {
  test('Teste se o click para /meals funciona', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Footer />
      </Router>,
    );
    userEvent.click(screen.getByTestId('meals-bottom-btn'));
  });
});
