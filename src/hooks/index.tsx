import React, { ReactNode } from 'react';
import { RootSiblingParent } from 'react-native-root-siblings';

import { AuthProvider } from './auth';

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <RootSiblingParent>
      <AuthProvider>{children}</AuthProvider>
    </RootSiblingParent>
  );
};

export { AppProvider };
