import React, { useContext } from "react";
import { StyleSheet, Text, View, SafeAreaView, Modal } from "react-native";
import Count from "../Components/Count";
import BooksList from "../Components/BooksList";
import Button from "../Components/Button";
import { Ionicons } from "@expo/vector-icons";
import colors from "../assets/colors";
import BookInputForm from "../Components/BookInputForm";
import { BooksContext } from "../Context/BooksContextProvider";
import { UserCredentialsContext } from "../Context/UserCredentialsContextProvider";

export default function HomeScreen({ navigation, route }) {
  const BooksContextValue = useContext(BooksContext);

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

  const { storedCredentials } = useContext(UserCredentialsContext)

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
