import React, { useEffect, useContext } from "react";
import { StyleSheet, Text, View, SafeAreaView, Modal, TouchableWithoutFeedback, Keyboard } from "react-native";
import Count from "../Components/Count";
import BooksList from "../Components/BooksList";
import Button from "../Components/Button";
import { Ionicons } from "@expo/vector-icons";
import colors from "../assets/colors";
import BookInputForm from "../Components/BookInputForm";
import { BooksContext } from "../Context/BooksContextProvider";
import { UserCredentialsContext } from "../Context/UserCredentialsContextProvider";
import axios from 'axios';

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
    deleteBook,
    showAddBookBar,
    hideAddBookBar,
    getAllBooksForUser,
    handleBookEntry,
    markBookAsComplete,
    changeBookStatustoReading
  } = BooksContextValue;

    const { storedCredentials } = useContext(UserCredentialsContext)
    let { _id: userId } = storedCredentials

    const idObj = {};
    idObj.userId = userId;

    // useEffect(()=>{
    //   getAllBooksForUser(idObj)
    // })

    newBook.userId = userId
  
    useEffect(()=>{
        handleBookEntry(newBook)
      }, [newBook])

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaView}/>
      <View style={styles.header}>
        <Text style={styles.headerText}>Bibliophilia</Text>
      </View>
      <View style={styles.body}>
        <Modal 
          style = {styles.safeAreaView} 
          visible={isAddBookBarVisible} 
          animationType="slide">
            <SafeAreaView />
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.contentView}>
                  <BookInputForm addFormValues={addFormValues} hideAddBookBar={hideAddBookBar}></BookInputForm>
                </View>
              </TouchableWithoutFeedback>
            <SafeAreaView />
        </Modal>
        <BooksList
          books={books}
          markBookAsComplete={(item) => markBookAsComplete(item)}
          changeBookStatustoReading={(item) => changeBookStatustoReading(item)}
          deleteBook={(item) => deleteBook(item)}
        />
        <Button
          style={[
            styles.plusButtonView,
            {
              position: "absolute",
              bottom: 10,
              right: 15,
            },
          ]}
          onPress={showAddBookBar}
        >
          <Text style={styles.plusButton}>+</Text>
        </Button>
      </View>
      {/* <View style={styles.footer}>
        <Count title="All Books" count={totalCount} />
        <Count title="Reading" count={readingCount} />
        <Count title="Read" count={readCount} />
      </View> */}
      <SafeAreaView style={styles.safeAreaView}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryColor,
  },
  safeAreaView: {
    backgroundColor: colors.primaryColor
  },
  header: {
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primaryColor,
  },
  headerText: {
    fontSize: 24,
    color:'#fff'
  },
  body: {
    flex: 1,
    backgroundColor:colors.mainBgColor
  },
  closeMarkView: {
    height: 50,
    width: 50,
    backgroundColor: colors.closeMarkBgColor,
    alignItems: "center",
    justifyContent: "center",
  },
  // plusButtonView: {
  //   backgroundColor: colors.primaryColor,
  //   height:60,
  //   width: 60,
  //   borderRadius: 30,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   color: colors.primaryColor,
  // },
  plusButton: {
    color: colors.primaryColor,
    fontSize: 60,
    fontWeight: '600',
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
