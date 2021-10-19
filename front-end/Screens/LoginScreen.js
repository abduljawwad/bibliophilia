import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../assets/colors';
import CustomButton from '../Components/Button';
import KeyboardAvoidingWrapper from '../Components/KeyBoardAvoidingWrapper';
import axios from 'axios'
import * as Google from 'expo-google-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserCredentialsContext } from '../Context/UserCredentialsContextProvider';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState();
  const [messsageType, setMessageType] = useState();
  const [isGoogleSigninComplete, setIsGoogleSigninComplete] = useState(true)
  const [accessToken, setAccessToken] = useState(null)
  const [googleSigninType, setGoogleSigninType] = useState(null)
  const { storedCredentials,setStoredCredentials } = useContext(UserCredentialsContext)

  const { btnBgColor } = colors
  
  
  const handleLogin = (credentials) => {

    setIsLoading(true)
    setMessage(null)
    setMessageType(null)

    const url = 'http://localhost:5000/user/login'

    axios
      .post(url, credentials)
      .then((response)=>{
        setIsLoading(false)
        const result =  response.data
        const {message, status, data} = result

        if (status !== 'SUCCESS') {
          handleMessage(message, status)
        } else {
          navigation.navigate('Main',{...data[0]})
          persistSignin({...data[0]}, message, status)
          console.log("🚀 ~ file: LoginScreen.js ~ line 47 ~ .then ~ ...data[0] inside normal signin", data[0])
        }
      })
      .catch(error => {
      setIsLoading(false)
      console.log(error)
      handleMessage('An error occurred. Please check your internet connection and try again')
    })
  }

  const handleMessage = (message, messsageType='FAILED') => {
    setMessage(message);
    setMessageType(messsageType)
  }

  const credentials = {
    email,
    password
  }

  const config = {
    iosClientId: `1020179379148-j932l35smf18pea4a9h90426chg0hh27.apps.googleusercontent.com`,
    androidClientId:`1020179379148-7a42e3i22n8ccclg646km3fmkml4fjhl.apps.googleusercontent.com`,
    scopes: ['profile', 'email']
  }

  const handleGoogleSignin = async () => {
    setIsGoogleSigninComplete(false)

    try {
      const { type, user } = await Google.logInAsync(config)
      setIsGoogleSigninComplete(true)
      setGoogleSigninType(type)
      if (type === 'success') {
        const {email, name, photoUrl, accessToken} = user
        setAccessToken(accessToken)
        // handleMessage('Google signin successful', 'SUCCESS');
        setTimeout(() => navigation.navigate('Main', {email, name, photoUrl}))
        persistSignin({email,name,photoUrl},'Google signin successful', 'SUCCESS')
      } else {
        handleMessage('Google signin was cancelled')
      }
    } catch(error) {
      setIsGoogleSigninComplete(true)
      setGoogleSigninType(null)
      console.log(error)
      handleMessage('An error occurred. Please check your network and try again')
    }
  }

  const handleGoogleSignout = async() => {

    const { iosClientId, androidClientId } = config
    const type = googleSigninType

    try {
      if (type === 'success') {
        await Google.logOutAsync({accessToken, iosClientId, androidClientId})
      }
    } catch(error) {
      console.log(error)
    }
  }

  const persistSignin = async (credentials, message, status) => {
    try {
      const result = await AsyncStorage.setItem('bibliophia', JSON.stringify(credentials))
        handleMessage(message, status);
        setStoredCredentials(credentials);
    } catch(error) {
      console.log(error)
      handleMessage('Persist Login failed')
    }
  }
  
  return (
    <KeyboardAvoidingWrapper>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Ionicons
            name="ios-book"
            size={150}
            color={btnBgColor}
          ></Ionicons>
          <Text style={styles.titleFrom}>Bibliophilia</Text>
        </View>
        <View style={styles.textInputContainer}>
          <Text style={styles.labelText}>Email Address</Text>
          <View style={styles.iconAndInputcontainer}>
            <Ionicons name="mail" style={styles.icon} />
            <TextInput
              style={[styles.textInput]}
              placeholder="abc@example.com"
              keyboardType="email-address"
              autoFocus={true}
              onChangeText={(text) => setEmail(text)}
              autoCapitalize='none'
              value={email}
              editable={true}
            />
          </View>
          <Text style={styles.labelText}>Password</Text>
          <View style={styles.iconAndInputcontainer}>
            <Ionicons name="lock-closed" style={styles.icon} />
            <TextInput
              style={[styles.textInput]}
              placeholder="Enter Password"
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
              autoCapitalize='none'
              value={password}
              editable={true}
            />
          </View>
          <Text style={styles.messageText} type={messsageType}>{message}</Text>
        </View>
        <View style={styles.signInSignUpButtonContainer}>
          <CustomButton style={styles.signInButton} onPress={() => handleLogin(credentials)}>
            <Text style={styles.signInButtonText}>
              {isLoading ? 
              <ActivityIndicator size="small" color='white' />
              : `Login`}
              </Text>
          </CustomButton>
          <CustomButton
            style={{
              ...styles.signInButton,
              justifyContent: 'center',
              alignItems: 'flex-start',
              backgroundColor: '#428fff',
            }}
            onPress={() => {handleGoogleSignin()}}
          >
            <View style={styles.googleButtonView}>
              <Ionicons name="logo-google" size={20} color="#fff" style={styles.googleIcon} />
              <Text style={{ ...styles.signInButtonText, ...styles.googleSigninBtnText}}>
                {isGoogleSigninComplete ? 
                `Sign in with Google` :
                <ActivityIndicator size="small" />
                }
              </Text>
            </View>
          </CustomButton>
          <View style={styles.line}></View>
          <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account already?</Text>
          <CustomButton style = {styles.signupButton} onPress={() => {navigation.navigate('Signup')}}>
              <Text style={styles.signupBtnText}>Sign up</Text>
          </CustomButton>
          </View>
        </View>
      </View>
      </KeyboardAvoidingWrapper>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mainBgColor,
  },
  textInputContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: '5%',
    marginHorizontal: '10%',
  },
  labelText: {
    fontSize: 16,
    alignSelf: 'flex-start',
    marginLeft: 15,
    marginBottom: '2%',
    width: '90%',
  },
  iconAndInputcontainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    width: '90%',
    marginBottom: '8%',
  },
  icon: {
    padding: 7,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    color: colors.btnBgColor
  },
  textInput: {
    paddingRight: 7,
    paddingTop: 7,
    paddingBottom: 7,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
  },
  messageText: {
    color: 'green',
    fontSize: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '400',
  },
  signInSignUpButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: '10%',
  },
  signInButton: {
    borderWidth: 1,
    padding: 8,
    width: '90%',
    height: '30%',
    backgroundColor: colors.btnBgColor,
    borderRadius: 50,
    marginBottom: '2%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff'
  },
  googleSigninBtnText: {
    width: '90%',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  activityIndicatorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    elevation: 1000,
  },
  line: {
    height: 1,
    width: '85%',
    backgroundColor: 'black',
    margin: '5%',
  },
  googleButtonView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  googleIcon: {
    width: '10%',
  },
  logoContainer: {
    flex: 1.5,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: "5%",
    padding: 8,
  },
  titleFrom: {
    fontSize: 32,
    fontWeight: "300",
  },
  signupContainer:{
    flex:1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'flex-start'
  },
  signUpButton:{
    color: '#111',
    display: 'flex',
    flexDirection: 'row',
  },
  signupBtnText:{
    color: 'blue',
    textDecorationLine: 'underline'
  },
});
