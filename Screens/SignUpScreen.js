import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../assets/colors";
import CustomButton from "../Components/Button";

export default function SignUpScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <CustomButton
        style={styles.signInButton}
        onPress={() => navigation.navigate("Welcome")}
      >
        <Text style={styles.signInButtonText}>Login</Text>
      </CustomButton>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
