import React, { useState } from 'react';
import { Errors, validateUser } from '../utils/validateUser';

interface ContextState {
  isAuth: boolean;
  errors: Errors;
  login: (u: string, p: string) => void;
  logout: () => void;
}

const AuthContext = React.createContext<ContextState>({
  isAuth: false,
  login: (u: string, p: string) => {},
  logout: () => {},
  errors: {
    login: null,
    password: [],
  },
});

function AuthProvider({ children }: any) {
  const [isAuth, setIsAuth] = useState(false);
  const [errors, setErrors] = useState<Errors>({ login: null, password: [] });

  const login = (login: string, password: string) => {
    const errors = validateUser(login, password);
    if (!errors.login && errors.password.length < 1) {
      setIsAuth(true);
      window.sessionStorage.setItem('username', login);
      window.sessionStorage.setItem('password', password);
    } else {
      setIsAuth(false);
      setErrors(errors);
    }
  };
  const logout = () => {
    setIsAuth(false);
    window.sessionStorage.removeItem('username');
    window.sessionStorage.removeItem('password');
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout, errors }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
