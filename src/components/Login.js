import React from 'react';

export default function Login() {
  return (
    <div>
      <input
        type="email"
        data-testid="email-input"
      />
      <input
        type="password"
        data-testid="password-input"
      />
      <input
        type="button"
        data-testid="login-submit-btn"
      />
    </div>
  );
}
