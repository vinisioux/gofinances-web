import React, { createContext, useCallback, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoFinances:token');
    const user = localStorage.getItem('@GoFinances:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    await api
      .post('sessions', {
        email,
        password,
      })
      .then(response => {
        const { token, user } = response.data;

        localStorage.setItem('@GoFinances:token', token);
        localStorage.setItem('@GoFinances:user', JSON.stringify(user));

        api.defaults.headers.authorization = `Bearer ${token}`;

        setData({ token, user });
      })
      .catch(error => {
        if (
          error.response.data.message === 'Incorrect email/password combination'
        ) {
          toast.error('E-mail ou senha incorreto, verifique novamente.');
        }
      });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoFinances:token');
    localStorage.removeItem('@GoFinances:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}
