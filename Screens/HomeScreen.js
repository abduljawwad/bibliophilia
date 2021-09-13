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
import Count from "../Components/Count";
import BooksList from "../Components/BooksList";
import Button from "../Components/Button";
import { Ionicons } from "@expo/vector-icons";
import colors from "../assets/colors";
import _ from "lodash";

export default function HomeScreen({ navigation }) {
  const [totalCount, setTotalCount] = useState(0);
  const [readingCount, setReadingCount] = useState(0);
  const [readCount, setReadCount] = useState(0);
  const [isAddBookBarVisible, setIsAddBookBarVisible] = useState(false);
  const [newBook, setNewBook] = useState("");
  const [books, setBooks] = useState([]);

  const showAddBookBar = () => {
    setIsAddBookBarVisible(true);
  };

  const hideAddBookBar = () => {
    setIsAddBookBarVisible(false);
  };

  const addBook = () => {
    const checkIfBookAlreadyExists = _.includes(books, newBook);
    if (!checkIfBookAlreadyExists) {
      setBooks([...books, newBook]);
      setTotalCount((prevTotalCount) => prevTotalCount + 1);
      setReadingCount((prevReadingCount) => prevReadingCount + 1);
    }
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
        {/* <Button
          onPress={() => navigation.navigate("Settings")}
          style={styles.checkMarkView}
        >
          <Ionicons name="ios-checkmark" color="white" size={30}></Ionicons>
        </Button> */}
      </View>
      <View style={styles.body}>
        {isAddBookBarVisible && (
          <View style={styles.addBookBarView}>
            <TextInput
              style={styles.addBookBarTextInput}
              placeholder="Enter Book Name"
              placeholderTextColor="grey"
              onChangeText={(text) => setNewBook(text)}
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
    backgroundColor: colors.mainBgColor,
  },
  header: {
    height: 70,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderColor,
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
    backgroundColor: colors.borderColor,
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
    backgroundColor: colors.checkMarkBgColor,
    alignItems: "center",
    justifyContent: "center",
  },
  closeMarkView: {
    height: 50,
    width: 50,
    backgroundColor: colors.closeMarkBgColor,
    alignItems: "center",
    justifyContent: "center",
  },
  plusButtonView: {
    height: 50,
    width: 50,
    backgroundColor: colors.addButtonBgColor,
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
    borderTopColor: colors.borderColor,
    flexDirection: "row",
  },
});
