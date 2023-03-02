import React, { useState } from 'react';
import isEmail from 'validator/lib/isEmail';

export default function Login() {
  const [email, setEmail] = useState('');
  const [passwordLen, setPasswordLen] = useState('');
  const minLength = 6;
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
          disabled={ !isEmail(email) || (passwordLen <= minLength) }
        />
      </form>
    </div>
  );
}
