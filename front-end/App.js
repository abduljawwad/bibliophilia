import React from 'react';
import UserCredentialsContextProvider from './Context/UserCredentialsContextProvider';
import NavigationStack from './Navigators/NavigationStack';

export default function App() {
 
  return (
    <UserCredentialsContextProvider>
      <NavigationStack />
    </UserCredentialsContextProvider>
  );
}
