import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../assets/colors";
import CustomButton from "../Components/Button";

export default function WelcomeScreen({ navigation, route }) {

  console.log("🚀 ~ file: WelcomeScreen.js ~ line 8 ~ WelcomeScreen ~ route", route.params)

  return (
    <>
      <View style={styles.container}>
        {/* <Button title="Go to Home" /> */}
        <View style={styles.logoContainer}>
          <Ionicons
            name="ios-book"
            size={150}
            color={colors.logoBgColor}
          ></Ionicons>
          <Text style={styles.title}>Bibliophilia</Text>
        </View>
        <View style={styles.signInSignUpButtonContainer}>
          <CustomButton
            style={styles.signInButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.signInButtonText}>Login</Text>
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
  logoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: "5%",
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "300",
  },
  signInSignUpButtonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  signInButton: {
    borderWidth: 1,
    padding: 8,
    width: 200,
    borderRadius: 100,
    marginBottom: "2%",
    alignItems: "center",
    justifyContent: "center",
  },
  signInButtonText: {
    fontSize: 20,
    fontWeight: "100",
  },
});
