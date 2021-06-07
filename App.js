import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import Count from "./Components/Count";
import BooksList from "./Components/BooksList";
import Button from "./Components/Button";
import { Ionicons } from "@expo/vector-icons";

export default function App() {
  const [totalCount, setTotalCount] = useState(0);
  const [readingCount, setReadingCount] = useState(0);
  const [readCount, setReadCount] = useState(0);
  const [isAddBookBarVisible, setIsAddBookBarVisible] = useState(false);
  const [book, setBook] = useState("");
  const [books, setBooks] = useState([]);

  const showAddBookBar = () => {
    setIsAddBookBarVisible(true);
  };

  const hideAddBookBar = () => {
    setIsAddBookBarVisible(false);
  };

  const addBook = () => {
    setBooks([...books, book]);
    setTotalCount((prevTotalCount) => prevTotalCount + 1);
    setReadingCount((prevReadingCount) => prevReadingCount + 1);
  };

  const markAsRead = (selectedBook, index) => {
    let newBooksList = books.filter((book) => book !== selectedBook);
    setBooks(newBooksList);
    setReadingCount((prevReadingCount) => prevReadingCount - 1);
    setReadCount((prevReadCount) => prevReadCount + 1);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={styles.header}>
        <Text style={styles.headerText}>Bibliophilia</Text>
      </View>
      <View style={styles.body}>
        {isAddBookBarVisible && (
          <View style={styles.addBookBarView}>
            <TextInput
              style={styles.addBookBarTextInput}
              placeholder="Enter Book Name"
              placeholderTextColor="grey"
              onChangeText={(text) => setBook(text)}
            ></TextInput>
            <Button onPress={addBook} style={styles.checkMarkView}>
              <Ionicons name="ios-checkmark" color="white" size={30}></Ionicons>
            </Button>
            <Button onPress={hideAddBookBar} style={styles.closeMarkView}>
              <Ionicons name="ios-close" color="white" size={30}></Ionicons>
            </Button>
          </View>
        )}
        <BooksList
          books={books}
          markAsRead={(item, index) => markAsRead(item, index)}
        />
        <Button
          style={[
            styles.plusButtonView,
            {
              position: "absolute",
              bottom: 20,
              right: 20,
            },
          ]}
          onPress={showAddBookBar}
        >
          <Text style={styles.plusButton}>+</Text>
        </Button>
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
  addBookBarView: {
    flexDirection: "row",
    backgroundColor: "#E9E9E9",
    height: 50,
    justifyContent: "flex-end",
  },
  addBookBarTextInput: {
    flex: 1,
    paddingLeft: 5,
  },
  checkMarkView: {
    height: 50,
    width: 50,
    backgroundColor: "#a5deba",
    alignItems: "center",
    justifyContent: "center",
  },
  closeMarkView: {
    height: 50,
    width: 50,
    backgroundColor: "#deada5",
    alignItems: "center",
    justifyContent: "center",
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
    fontSize: 40,
  },
  footer: {
    height: 70,
    borderTopWidth: 0.5,
    borderTopColor: "#E9E9E9",
    flexDirection: "row",
  },
});
