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
  Modal,
} from "react-native";
import Count from "../Components/Count";
import BooksList from "../Components/BooksList";
import Button from "../Components/Button";
import { Ionicons } from "@expo/vector-icons";
import colors from "../assets/colors";
import _ from "lodash";
import BookInputForm from "./BookInputForm";
import { v4 as uuidv4 } from "uuid";

export default function HomeScreen({ navigation }) {
  const [totalCount, setTotalCount] = useState(0);
  const [readingCount, setReadingCount] = useState(0);
  const [readCount, setReadCount] = useState(0);
  const [isAddBookBarVisible, setIsAddBookBarVisible] = useState(false);
  const [newBook, setNewBook] = useState({
    id: uuidv4(),
    title: "",
    author: "",
    genre: "",
    readingFlag: true,
  });
  console.log(
    "🚀 ~ file: HomeScreen.js ~ line 27 ~ HomeScreen ~ newBook",
    newBook
  );
  const [books, setBooks] = useState([]);
  console.log("🚀 ~ file: HomeScreen.js ~ line 32 ~ HomeScreen ~ books", books);
  const [booksReading, setBooksReading] = useState([]);
  const [completedBooks, setCompletedBooks] = useState([]);
  console.log(
    "🚀 ~ file: HomeScreen.js ~ line 42 ~ HomeScreen ~ completedBooks",
    completedBooks
  );
  const [bookRead, setBookRead] = useState(false);

  setTotalCount(books.length);
  setReadingCount(booksReading.length);
  setReadCount(completedBooks.length);

  const showAddBookBar = () => {
    setIsAddBookBarVisible(true);
  };

  const hideAddBookBar = () => {
    setIsAddBookBarVisible(false);
  };

  const addBook = () => {
    const emptyString = "";
    const checkIfBookAlreadyExists = _.find(books, ["title", newBook.title]);
    if (
      newBook.title !== emptyString &&
      typeof checkIfBookAlreadyExists !== "object"
    ) {
      setBooks([...books, newBook]);
      setBooksReading([...booksReading, newBook]);
      // setTotalCount((prevTotalCount) => prevTotalCount + 1);
      // setReadingCount((prevReadingCount) => prevReadingCount + 1);
    }
  };

  const markAsRead = (selectedBook) => {
    const checkIfBookAlreadyExists = _.find(completedBooks, [
      "title",
      selectedBook.title,
    ]);
    if (typeof checkIfBookAlreadyExists !== "object") {
      selectedBook.readingFlag = false;
      let newBooksList = books.filter((book) => book.id !== selectedBook.id);
      setBooksReading(newBooksList);
      let completedBook = books.filter((book) => book.id === selectedBook.id);
      setCompletedBooks([...completedBooks, ...completedBook]);
      // setReadingCount((prevReadingCount) => prevReadingCount - 1);
      // setReadCount((prevReadCount) => prevReadCount + 1);
    }
  };

  const deleteBookEntry = (selectedBook) => {
    let updatedBooks = books.filter((book) => book.id !== selectedBook.id);
    let updatedBooksReading = booksReading.filter(
      (book) => book.id !== selectedBook.id
    );
    let updatedBooksCompleted = completedBooks.filter(
      (book) => book.id !== selectedBook.id
    );
    setBooks(updatedBooks);
    setBooksReading(updatedBooksReading);
    setCompletedBooks(updatedBooksCompleted);
  };

  const addFormValues = (formValues) => {
    setNewBook((newBook) => ({
      ...newBook,
      ...formValues,
      id: uuidv4(),
    }));
  };

  useEffect(() => {
    addBook();
  }, [newBook]);

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={styles.header}>
        <Text style={styles.headerText}>Bibliophilia</Text>
      </View>
      <View style={styles.body}>
        <Modal visible={isAddBookBarVisible} animationType="slide">
          <SafeAreaView />
          <View style={styles.contentView}>
            <Button
              onPress={hideAddBookBar}
              style={{
                ...styles.closeMarkView,
                alignSelf: "center",
              }}
            >
              <Ionicons name="ios-close" color="white" size={30}></Ionicons>
            </Button>
            <BookInputForm addFormValues={addFormValues}></BookInputForm>
          </View>
          <SafeAreaView />
        </Modal>
        <BooksList
          books={books}
          markAsRead={(item) => markAsRead(item)}
          deleteBookEntry={(item) => deleteBookEntry(item)}
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
        <Count title="All Books" count={totalCount} />
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
  contentView: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
});
