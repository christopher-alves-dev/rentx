import React, {
  createContext,
  useState,
  useContext,
  ReactNode
} from 'react';

import api from '../services/api';
import { Alert } from 'react-native';
import Toast from 'react-native-root-toast';
import * as Yup from 'yup';

interface User {
  id: string;
  email: string;
  name: string;
  driver_license: string;
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
}

interface AuthProveiderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({ children }: AuthProveiderProps) => {
  const [data, setData] = useState<AuthState | undefined>(undefined);

  const signIn = async ({ email, password }: SignInCredentials) => {
    try {
      const response = await api.post('/login', {
        email,
        password
      })
      
      const { token, user } = response.data;
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setData({ token, user })
      
    } catch (error) {
      
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa', error.message);
      } else {
        Toast.show('Email ou Senha inválida.', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.CENTER,
          backgroundColor: 'red'
        })
      }
    }
  }

  const signOut = () => {
    setData(undefined)
  }

  return (
    <AuthContext.Provider
      value={{
        user: data?.user,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth }