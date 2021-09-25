import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../assets/colors';
import CustomButton from '../Components/Button';
import KeyboardAvoidingWrapper from '../Components/KeyBoardAvoidingWrapper';
import axios from 'axios'

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState();
  const [messsageType, setMessageType] = useState();

  const { btnBgColor } = colors

  const handleLogin = (credentials) => {

    setIsLoading(true)
    setMessage(null)
    setMessageType(null)

    const url = 'http://still-hamlet-54265.herokuapp.com/user/login'

    axios
      .post(url, credentials)
      .then((response)=>{
        setIsLoading(false)
        const result =  response.data
        const {message, status, data} = result

        if (status !== 'SUCCESS') {
          handleMessage(message, status)
        } else {
          navigation.navigate('Main')
        }
      })
      .catch(err => {
      setIsLoading(false)
      console.log(errror.JSON())
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
          {isLoading ? (
          <View style={[StyleSheet.absoluteFill, styles.signInButtonText]}>
            <ActivityIndicator size="large" color='white' />
          </View>
        ) : <Text style={styles.signInButtonText}>Login</Text>}
          </CustomButton>
          <CustomButton
            style={{
              ...styles.signInButton,
              justifyContent: 'center',
              alignItems: 'flex-start',
              backgroundColor: '#428fff',
            }}
            onPress={() => {}}
          >
            <View style={styles.googleButtonView}>
              <Ionicons name="logo-google" size={20} color="#fff" style={styles.googleIcon} />
              <Text style={{ ...styles.signInButtonText, width: '80%', color: '#fff' }}>Sign in with google</Text>
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
    backgroundColor: colors.btnBgColor,
    borderRadius: 50,
    marginBottom: '2%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff'
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
    width: '20%',
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
