import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WelcomeScreen from '../Screens/WelcomeScreen';
import HomeScreen from '../Screens/HomeScreen';
import ReadingScreen from '../Screens/ReadingScreen';
import ReadScreen from '../Screens/ReadScreen';
import LoginScreen from '../Screens/LoginScreen';
import SignupScreen from '../Screens/SignupScreen';
import BooksContextProvider from '../Context/BooksContextProvider';
import {UserCredentialsContext} from '../Context/UserCredentialsContextProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import colors from '../assets/colors'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainPages () {
  return (
      <BooksContextProvider>
				<Tab.Navigator 
					initialRouteName="Home" 
					screenOptions={{
						headerShown:false,
						tabBarActiveBackgroundColor: colors.primaryColor,
						tabBarInactiveBackgroundColor: colors.primaryColor,
						tabBarActiveTintColor: '#fff',
						tabStyle: {
							backgroundColor: colors.primaryColor,
						},
						style: {
							backgroundColor: colors.primaryColor,
							fontSize: 30,
						}
					}}
					>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Reading" component={ReadingScreen} />
          <Tab.Screen name="Read" component={ReadScreen} />
        </Tab.Navigator>
      </BooksContextProvider>
  )
}

export default function NavigationStack({ navigation }) {
	const { storedCredentials } = useContext(UserCredentialsContext)
 
  return (
		<SafeAreaProvider>
			<NavigationContainer>
					<Stack.Navigator 
						screenOptions={{
							headerShown:false,
						}}
						>
						{
						storedCredentials? 
						<>
							<Stack.Screen name="Main" component={MainPages} />
							<Stack.Screen name="Welcome" component={WelcomeScreen} /> 
							<Stack.Screen name="Login" component={LoginScreen} />
							<Stack.Screen name="Signup" component={SignupScreen} />
						</>
						: 
						<>					
							<Stack.Screen name="Login" component={LoginScreen} />
							<Stack.Screen name="Signup" component={SignupScreen} />
							<Stack.Screen name="Main" component={MainPages} />
						</>
						}
					</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>

  );
}