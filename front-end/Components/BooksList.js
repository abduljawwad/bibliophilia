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
  const { books, markAsRead, deleteBookEntry } = props;
  const itemsList = ({ item }) => (
    <View style={styles.booksList}>
      <View style={styles.bookItem}>
        <View style={styles.imagecontainer}>
          <Image style={styles.image}></Image>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.bookTitle}>{item.title}</Text>
        </View>
        <View style={styles.buttonContainer}>
          {(item.readingFlag && (
            <View>
              <Button
                style={styles.markAsReadView}
                onPress={() => markAsRead(item)}
              >
                <Text style={styles.markAsReadText}>Mark as Read</Text>
              </Button>
              <Button
                style={{
                  ...styles.markAsReadView,
                  backgroundColor: colors.closeMarkBgColor,
                }}
                onPress={() => deleteBookEntry(item)}
              >
                <Text style={styles.markAsReadText}>Delete Book</Text>
              </Button>
            </View>
          )) ||
            (!item.readingFlag && (
              <View>
                <Button style={styles.markAsReadView}>
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
                    backgroundColor: colors.closeMarkBgColor,
                  }}
                  onPress={() => deleteBookEntry(item)}
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
      keyExtractor={(item) => item.id}
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
    flexDirection: "row",
  },
  bookTitle: {
    flex: 1,
    paddingLeft: 8,
    paddingRight: 5,
    fontWeight: "400",
    fontSize: 16,
    alignSelf: "center",
  },
  buttonContainer: {
    width: 100,
    marginRight: 10,
  },
  markAsReadView: {
    backgroundColor: "#a5deba",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 100,
    width: 100,
    height: 35,
    marginRight: 10,
  },
  markAsReadText: { paddingRight: 5, color: "white" },
  listEmptyView: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  listEmptyText: { fontSize: 16, fontWeight: "bold" },
});
