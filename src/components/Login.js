import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';

export default function Login() {
  // Email salvo em hook para validação
  const [email, setEmail] = useState('');
  // Tamanho da senha para validação
  const [passwordLen, setPasswordLen] = useState('');
  const minLength = 6;
  const history = useHistory();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const user = {
      email,
    };
    localStorage.setItem('user', JSON.stringify(user));
    history.push('/meals');
  };

  return (
    <div>
      <form>
        <input
          type="email"
          data-testid="email-input"
          onChange={ (evt) => setEmail(evt.target.value) }
          required
        />
        <input
          type="password"
          minLength="6"
          onChange={ (evt) => setPasswordLen((evt.target.value).length) }
          required
          data-testid="password-input"
        />
        <input
          type="submit"
          data-testid="login-submit-btn"
          // Caso o email seja inválido ou/e a senha seja menor ou igual a 6
          // o botão é desativado
          disabled={ !isEmail(email) || (passwordLen <= minLength) }
          onClick={ (evt) => handleSubmit(evt) }
        />
      </form>
    </div>
  );
}
