import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { AppTabRoutes } from './app.tab.routes';
import { AuthRoutes } from './auth.routes';
import { useAuth } from '../hooks/auth';

export const Routes = () => {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      {user ? <AppTabRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};
