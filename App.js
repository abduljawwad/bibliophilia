import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Count from "./Components/Count";

export default function App() {
  const [totalCount, setTotalCount] = useState(0);
  const [readingCount, setReadingCount] = useState(0);
  const [readCount, setReadCount] = useState(0);

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={styles.header}>
        <Text style={styles.headerText}>Bibliophilia</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.searchBarView}>
          <TextInput
            style={styles.searchBarTextInput}
            placeholder="Enter Book Name"
            placeholderTextColor="grey"
          ></TextInput>
          <TouchableOpacity>
            <View style={styles.checkMarkView}></View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ position: "absolute", bottom: 20, right: 20 }}
        >
          <View style={styles.plusButtonView}>
            <Text style={styles.plusButton}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Count title="Total" count={totalCount} />
        <Count title="Reading" count={readingCount} />
        <Count title="Read" count={readCount} />
      </View>
      <SafeAreaView />
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
  searchBarView: {
    flexDirection: "row",
    backgroundColor: "#E9E9E9",
    height: 50,
  },
  searchBarTextInput: {
    paddingLeft: 5,
  },
  plusButtonView: {
    height: 50,
    width: 50,
    backgroundColor: "#AAD1E6",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  plusButton: {
    color: "white",
    fontSize: 30,
  },
  footer: {
    height: 70,
    borderTopWidth: 0.5,
    borderTopColor: "#E9E9E9",
    flexDirection: "row",
  },
});
