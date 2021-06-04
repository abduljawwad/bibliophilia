import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";

export default function BooksList(props) {
  const { books } = props;
  const itemsList = ({ item }) => (
    <View style={styles.booksList}>
      <View style={styles.bookItem}>
        <Text style={styles.bookTitle}>{item}</Text>
      </View>
      <TouchableOpacity style={styles.markAsReadView}>
        <View>
          <Text style={styles.markAsReadText}>Mark as Read</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const listEmptyView = (
    <View style={styles.listEmptyView}>
      <Text style={styles.listEmptyText}>No books added to the list yet</Text>
    </View>
  );

  return (
    <FlatList
      data={[...books]}
      keyExtractor={(item, index) => index.toString()}
      renderItem={itemsList}
      ListEmptyComponent={listEmptyView}
    ></FlatList>
  );
}

const styles = StyleSheet.create({
  booksList: {
    flexDirection: "row",
    height: 50,
  },
  bookItem: {
    flex: 1,
    justifyContent: "center",
  },
  bookTitle: { paddingLeft: 5 },
  markAsReadView: {
    backgroundColor: "#a5deba",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
  },
  markAsReadText: { paddingRight: 5, color: "white" },
  listEmptyView: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  listEmptyText: { fontSize: 16, fontWeight: "bold" },
});
