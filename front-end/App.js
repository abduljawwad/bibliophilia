import React, {useState} from 'react';
import NavigationStack from './Navigators/NavigationStack';
import { UserCredentialsContext } from './Context/UserCredentialsContextProvider';
import AppLoading from 'expo-app-loading';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {

  const [storedCredentials, setStoredCredentials] = useState("");
  const [appReady, setAppReady ] = useState(false)

  const handleLoginCredentials = async() => {
    try {
      const result = await AsyncStorage.getItem("bibliophia")
      if (result !== null) {
        setStoredCredentials(JSON.parse(result))
      } else {
        setStoredCredentials(null)
      }
    } catch(error) {
      console.log(error)
    }
  }

  if (!appReady)
  <AppLoading
  startAsync={handleLoginCredentials}
  onFinish={() => {setAppReady(true)}}
  onError={console.warn}
    />

  const userCredentials = {
		storedCredentials,
		setStoredCredentials,
	}
 
  return (
    <UserCredentialsContext.Provider value={userCredentials}>
      <NavigationStack />
    </UserCredentialsContext.Provider>
  );
}
