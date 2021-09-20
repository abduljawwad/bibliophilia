import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, Modal } from "react-native";
import BooksList from "../Components/BooksList";
import colors from "../assets/colors";
import { BooksContext } from "../Context/BooksContextProvider";

export default function ReadingScreen({ navigation }) {
  const BooksContextValue = React.useContext(BooksContext);

  const {
    totalCount,
    setTotalCount,
    readingCount,
    setReadingCount,
    readCount,
    setReadCount,
    isAddBookBarVisible,
    setIsAddBookBarVisible,
    newBook,
    setNewBook,
    books,
    setBooks,
    booksReading,
    setBooksReading,
    completedBooks,
    setCompletedBooks,
    addBook,
    markAsRead,
    addFormValues,
    deleteBookEntry,
    showAddBookBar,
    hideAddBookBar,
  } = BooksContextValue;

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={styles.header}>
        <Text style={styles.headerText}>Bibliophilia</Text>
      </View>
      <View style={styles.body}>
        <BooksList
          books={completedBooks}
          markAsRead={(item) => markAsRead(item)}
          deleteBookEntry={(item) => deleteBookEntry(item)}
        />
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
