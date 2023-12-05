import axios from 'axios';
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Alert } from 'react-native';
import Toast from 'react-native-root-toast';
import { useTheme } from 'styled-components/native';
import * as Yup from 'yup';

import api from '../services/api';

interface User {
  id: string;
  email: string;
  name: string;
  driverLicense: string;
  avatar: string;
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
  user: User | undefined;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  validatePassword: (credentials: SignInCredentials) => Promise<boolean>;
}

interface AuthProveiderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({ children }: AuthProveiderProps) => {
  const theme = useTheme();
  const [data, setData] = useState<AuthState | undefined>(undefined);

  const signIn = async ({ email, password }: SignInCredentials) => {
    try {
      const response = await api.post('/login', {
        email,
        password,
      });

      console.log({ res: response.data });

      const { token, user } = response.data;
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setData({ token, user });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa', error.message);
      } else {
        Toast.show('Credential inválida.', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.CENTER,
          backgroundColor: 'red',
        });
      }
    }
  };

  const validatePassword = async ({ email, password }: SignInCredentials) => {
    try {
      const response = await api.post('/login', {
        email,
        password,
      });

      return data?.user.email === email && response.data.accessToken;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          Toast.show('Senha incorreta!!!', {
            duration: Toast.durations.LONG,
            position: Toast.positions.TOP,
            backgroundColor: theme.colors.main,
            opacity: 1,
          });

          return false;
        }
        console.error({ responseError: error.response });
      } else {
        console.error(error);
      }
    }
  };

  const signOut = () => {
    setData(undefined);
  };

  return (
    <AuthContext.Provider
      value={{
        user: data?.user,
        signIn,
        signOut,
        validatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
