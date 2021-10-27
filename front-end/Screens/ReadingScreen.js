import React, { useEffect, useContext } from "react";
import { StyleSheet, Text, View, SafeAreaView, Modal } from "react-native";
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
    newBook,
    booksReading,
    deleteBook,
    handleBookEntry,
    markBookAsComplete,
    changeBookStatustoReading
  } = BooksContextValue;

    const { storedCredentials } = useContext(UserCredentialsContext)
    let { _id: userId } = storedCredentials

    const idObj = {};
    idObj.userId = userId;

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
        <BooksList
          books={booksReading}
          markBookAsComplete={(item) => markBookAsComplete(item)}
          changeBookStatustoReading={(item) => changeBookStatustoReading(item)}
          deleteBook={(item) => deleteBook(item)}
        />
      </View>
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
  contentView: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
});
