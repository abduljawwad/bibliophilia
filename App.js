import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{}} />
      <View style={styles.header}>
        <Text style={styles.headerText}>Bibliophilia</Text>
      </View>
      <View style={styles.body} />
      <View style={styles.footer}>
        <View style={styles.footerComponent}>
          <Text style={styles.footerText}>Total</Text>
          <Text style={styles.footerText}>0</Text>
        </View>
        <View style={styles.footerComponent}>
          <Text style={styles.footerText}>Read</Text>
          <Text style={styles.footerText}>0</Text>
        </View>
        <View style={styles.footerComponent}>
          <Text style={styles.footerText}>In Progress</Text>
          <Text style={styles.footerText}>0</Text>
        </View>
      </View>
      <SafeAreaView style={{}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 70,
    borderBottomWidth: 0.5,
    borderBottomColor: "#E9E9E9",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 24,
  },
  body: {
    flex: 1,
  },
  footer: {
    height: 70,
    borderTopWidth: 0.5,
    borderTopColor: "#E9E9E9",
    flexDirection: "row",
  },
  footerComponent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
