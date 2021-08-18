import React, { useCallback, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import './styles.scss';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { isAuth, login, errors } = useAuth();

  const renderLoginErrors = useCallback(() => {
    return errors.login ? (
      <p className='login-form-field__error' data-testid='error'>
        {errors.login} 🙈
      </p>
    ) : null;
  }, [errors.login]);

  const renderPasswordErrors = useCallback(() => {
    return errors.password
      ? errors.password.map((e) => (
          <p key={e} data-testid='error' className='login-form-field__error'>
            {e} 🙈
          </p>
        ))
      : null;
  }, [errors.password]);

  if (isAuth) {
    return <Redirect to='/' />;
  }

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div className='login-container'>
      <h1 className='login-title'>Twikker</h1>
      <form className='login-form' onSubmit={handleOnSubmit}>
        <div className='login-form-field'>
          <label className='login-form-field__label' htmlFor='username'>
            Login
          </label>
          <input
            className='login-form-field__input'
            type='text'
            id='username'
            data-testid='login'
            onChange={(e) => setUsername(e.target.value)}
          />
          {renderLoginErrors()}
        </div>
        <div className='login-form-field'>
          <label className='login-form-field__label' htmlFor='pass'>
            Password
          </label>
          <input
            className='login-form-field__input'
            type='password'
            id='pass'
            data-testid='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          {renderPasswordErrors()}
        </div>
        <button type='submit' className='login-form-submit'>
          Log in 👍🏻
        </button>
      </form>
    </div>
  );
}
