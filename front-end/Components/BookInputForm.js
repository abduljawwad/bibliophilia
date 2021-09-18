import React from "react";
import { StyleSheet, Button, TextInput, View, Text } from "react-native";
import { Formik } from "formik";

export default function BookInputForm({ addFormValues }) {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ title: "", author: "", genre: "" }}
        onSubmit={(values) => addFormValues(values)}
      >
        {(props) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Book title (Required)"
              onChangeText={props.handleChange("title")}
              value={props.values.title}
            />

            <TextInput
              style={styles.input}
              multiline
              placeholder="Author Name"
              onChangeText={props.handleChange("author")}
              value={props.values.author}
            />

            <TextInput
              style={styles.input}
              placeholder="Genre"
              onChangeText={props.handleChange("genre")}
              value={props.values.genre}
              keyboardType="numeric"
            />

            <Button
              color="maroon"
              title="Submit"
              onPress={props.handleSubmit}
            />
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
});
