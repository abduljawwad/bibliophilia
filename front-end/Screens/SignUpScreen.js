import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../Components/Button';
import colors from '../assets/colors';
import 'firebase/auth';
import KeyboardAvoidingWrapper from '../Components/KeyBoardAvoidingWrapper';

export default function LoginScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <KeyboardAvoidingWrapper>
      <View style={styles.container}>
        {isLoading ? (
          <View style={[StyleSheet.absoluteFill, styles.activityIndicatorContainer]}>
            <ActivityIndicator size="large" color={colors.logoBgColor} />
          </View>
        ) : null}
        <View style={styles.textInputContainer}>
          <Text style={styles.labelText}>Full Name</Text>
          <View style={styles.iconAndInputcontainer}>
            <Ionicons name="person" style={styles.icon} />
            <TextInput
              style={[styles.textInput]}
              placeholder="John Doe"
              keyboardType="default"
              autoFocus={true}
              onChangeText={(text) => setFullName(text)}
              autoCapitalize='words'
              value={fullName}
              editable={true}
            />
          </View>
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
          <Text style={styles.labelText}>Confirm Password</Text>
          <View style={styles.iconAndInputcontainer}>
            <Ionicons name="lock-closed" style={styles.icon} />
            <TextInput
              style={[styles.textInput]}
              placeholder="Enter Password"
              secureTextEntry
              onChangeText={(text) => setConfirmPassword(text)}
              autoCapitalize='none'
              value={confirmPassword}
              editable={true}
            />
          </View>
        </View>
        <View style={styles.signInSignUpButtonContainer}>
        <CustomButton style={styles.signInButton} onPress={() => onSignIn()}>
            <Text style={styles.signInButtonText}>Sign up</Text>
          </CustomButton>
          <View style={styles.line}></View>  
          <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Already have an account?</Text>
          <CustomButton style = {styles.signupButton} onPress={() => {navigation.navigate('Login')}}>
              <Text style={styles.signupBtnText}>Sign in</Text>
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
    display:'flex',
    justifyContent: 'center',
  },
  textInputContainer: {
    flex: 2,
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
  textInput: {
    paddingRight: 7,
    paddingTop: 7,
    paddingBottom: 7,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
  },
  iconAndInputcontainer: {
    flexDirection: 'row',
    borderWidth: 1,
    width: '90%',
    marginBottom: '5%',
  },
  icon: {
    padding: 7,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
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
  line: {
    height: 1,
    width: '85%',
    backgroundColor: 'black',
    margin: '5%',
  },
  activityIndicatorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    elevation: 1000,
  },
  signupContainer:{
    flex:1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
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