import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../assets/colors";
import CustomButton from "../Components/Button";
import * as firebase from "firebase";
import "firebase/auth";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSignIn = async () => {
    if (email && password) {
      setIsLoading(true);
      try {
        const response = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        if (response) {
          setIsLoading(false);
          //navigate the user
        }
      } catch (err) {
        setIsLoading(false);
        if (err.code == "auth/user-not-found") {
          alert("A user with that email does not exist. Please sign up");
        } else if (err.code == "auth/invalid-email") {
          alert("Please enter a valid email address");
        }
      }
    } else {
      alert("Please enter email and password");
    }
  };
  const onSignUp = async () => {
    if (email && password) {
      setIsLoading(true);
      try {
        const response = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        if (response) {
          setIsLoading(false);
          //sign in the user
          this.onSignIn(email, password);
        }
      } catch (err) {
        setIsLoading(false);
        if (err.code == "auth/email-already-in-use") {
          alert("User already exists. Try Logging in");
        }
      }
    } else {
      alert("Please enter email and password");
    }
  };
  return (
    <>
      <View style={styles.container}>
        {isLoading ? (
          <View
            style={[StyleSheet.absoluteFill, styles.activityIndicatorContainer]}
          >
            <ActivityIndicator size="large" color={colors.logoBgColor} />
          </View>
        ) : null}
        <View style={styles.textInputContainer}>
          <TextInput
            style={[styles.textInput]}
            placeholder="abc@example.com"
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={[styles.textInput]}
            placeholder="Enter Password"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={styles.signInSignUpButtonContainer}>
          <CustomButton style={styles.signInButton} onPress={() => onSignIn()}>
            <Text style={styles.signInButtonText}>Login</Text>
          </CustomButton>
          <CustomButton style={styles.signInButton} onPress={() => onSignUp()}>
            <Text style={styles.signInButtonText}>Sign Up</Text>
          </CustomButton>
        </View>
      </View>
    </>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInputContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: "5%",
    marginHorizontal: "10%",
  },
  textInput: {
    borderWidth: 1,
    padding: 7,
    borderRadius: 2,
    width: "90%",
    marginBottom: "3%",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "300",
  },
  signInSignUpButtonContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  signInButton: {
    borderWidth: 1,
    padding: 8,
    width: 150,
    borderRadius: 100,
    marginBottom: "2%",
    alignItems: "center",
    justifyContent: "center",
  },
  signInButtonText: {
    fontSize: 20,
    fontWeight: "100",
  },
  activityIndicatorContainer: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    elevation: 1000,
  },
});
