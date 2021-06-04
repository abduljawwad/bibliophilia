import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

export default function Count(props) {
  return (
    <View style={styles.footerComponent}>
      <Text style={styles.footerText}>{props.title}</Text>
      <Text style={styles.footerText}>{props.count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footerComponent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    fontSize: 20,
  },
});
