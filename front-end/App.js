import React, { useState, useContext } from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import WelcomeScreen from "./Screens/WelcomeScreen";
import HomeScreen from "./Screens/HomeScreen";
import LoginScreen from "./Screens/LoginScreen";
import SettingsScreen from "./Screens/SettingsScreen";
import * as firebase from "firebase";
import { firebaseConfig } from "./Config/config";
import "firebase/auth";

const Stack = createStackNavigator();

export default function App({ navigation }) {
  const [isSignedIn, setIsSignedIn] = useState(true);

  const initializeFirebase = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app();
    }
  };

  const initializeFirebaseFn = initializeFirebase();

  const [initializeFirebaseVar, setInitializeFirebaseVar] =
    useState(initializeFirebaseFn);

  const signIn = (a) => {
    setIsSignedIn(a);
  };

  return isSignedIn ? (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home", headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: "Settings", headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  ) : (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ title: "Welcome", headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: "Login",
            headerShown: true,
            headerBackTitleVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
