import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import Button from "./Button";
import { Ionicons } from "@expo/vector-icons";
import colors from "../assets/colors";

export default function BooksList(props) {
  const { books, booksReading, markBookAsComplete, deleteBook, changeBookStatustoReading } = props;

  const itemsList = ({ item }) => (
    <View style={styles.booksList}>
      <View style={styles.bookItem}>
        <View style={styles.imagecontainer}>
          <Image style={styles.image}
            source={{uri:'http://images.amazon.com/images/P/0596004613.01._PE30_PI_SCMZZZZZZZ_.jpg'}}></Image>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.bookTitle}>{item.title}</Text>
          <Text style={styles.bookTitle}>{item.author}</Text>
        </View>
        <View style={styles.buttonContainer}>
          {(item.readingFlag && (
            <View>
              <Button
              style={styles.markAsReadView}
              onPress={() => markBookAsComplete(item)}>
              <Text style={styles.markAsReadText}>Mark as Read</Text>
             </Button>
              <Button
                style={{
                  ...styles.markAsReadView,
                  backgroundColor: colors.deleteBtnColor,
                }}
                onPress={() => deleteBook(item)}
              >
                <Text style={styles.markAsReadText}>Delete Book</Text>
              </Button>
            </View>
          ))
          ||
            (!item.readingFlag && (
              <View>
                <Button style={styles.markAsReadView}
                onPress={() => changeBookStatustoReading(item)}>
                  <Ionicons
                    name="ios-checkmark"
                    color="white"
                    size={30}
                    style={styles.markAsReadText}
                  ></Ionicons>
                </Button>
                <Button
                  style={{
                    ...styles.markAsReadView,
                    backgroundColor: colors.deleteBtnColor,
                  }}
                  onPress={() => deleteBook(item)}
                >
                  <Text style={styles.markAsReadText}>Delete Book</Text>
                </Button>
              </View>
            ))}
        </View>
      </View>
    </View>
  );

  const listEmptyView = (
    <View style={styles.listEmptyView}>
      <Text style={styles.listEmptyText}>No books in reading list!</Text>
    </View>
  );

  return (
    <FlatList
      data={[...books]}
      keyExtractor={(item) => item._id}
      renderItem={itemsList}
      ListEmptyComponent={listEmptyView}
    ></FlatList>
  );
}

const styles = StyleSheet.create({
  booksList: {
    display: "flex",
    flexDirection: "row",
    minHeight: 100,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    backgroundColor: colors.booksListColor,
    borderColor: colors.mainBgColor,
  },
  bookItem: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
  },
  imagecontainer: {
    borderRadius: 10,
    marginLeft: 10,
    width: 75,
  },
  image: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
  },
  titleContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: 'space-between',
  },
  bookTitle: {
    flex: 1,
    paddingLeft: 8,
    paddingRight: 5,
    paddingTop: 5,
    fontWeight: "400",
    fontSize: 16,
    color:'#fff',
  },
  buttonContainer: {
    width: 100,
    marginRight: 10,
    justifyContent: 'center',
  },
  markAsReadView: {
    backgroundColor: colors.markAsReadViewColor,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 100,
    width: 100,
    height: 35,
    marginRight: 10,
    borderRadius: 5,
    marginBottom: 3,
  },
  markAsReadText: { paddingRight: 5, color: "white" },
  listEmptyView: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  listEmptyText: { fontSize: 16, fontWeight: "bold" },
});
