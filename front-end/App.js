import React, { useState, useContext } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import WelcomeScreen from './Screens/WelcomeScreen';
import HomeScreen from './Screens/HomeScreen';
import ReadingScreen from './Screens/ReadingScreen';
import ReadScreen from './Screens/ReadScreen';
import LoginScreen from './Screens/LoginScreen';
import SignupScreen from './Screens/SignupScreen';
import SettingsScreen from './Screens/SettingsScreen';
import BooksContextProvider from './Context/BooksContextProvider';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainPages () {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{headerShown:false}}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Reading" component={ReadingScreen} />
      <Tab.Screen name="Read" component={ReadScreen} />
    </Tab.Navigator>
  )
}

export default function App({ navigation }) {
 
  return (
    <NavigationContainer>
      <BooksContextProvider>
        <Stack.Navigator initialRouteName='Welcome' screenOptions={{headerShown:false}}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Main" component={MainPages} />
        </Stack.Navigator>
      </BooksContextProvider>
    </NavigationContainer>
  );
}
