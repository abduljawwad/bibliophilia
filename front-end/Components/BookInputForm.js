import React from "react";
import { StyleSheet, Button, TextInput, View, Text } from "react-native";
import { Formik } from "formik";
import * as yup from 'yup'

const bookInputFormSchema = yup.object({
  title: yup.string()
    .required()
    .min(1),
  author: yup.string()
    .required()
    .min(2),
  genre: yup.string(),
  imageUrl: yup.string(),
})

export default function BookInputForm({ addFormValues }) {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ title: "", author: "", genre: "" }}
        validationSchema={bookInputFormSchema}
        onSubmit={(values, actions) => {
          addFormValues(values)
          actions.resetForm()
        }}
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
              placeholder="Author Name"
              onChangeText={props.handleChange("author")}
              value={props.values.author}
            />

            <TextInput
              style={styles.input}
              placeholder="Genre (optional)"
              onChangeText={props.handleChange("genre")}
              value={props.values.genre}
            />

            <TextInput
              style={styles.input}
              placeholder="Image URL (optional)"
              onChangeText={props.handleChange("imageUrl")}
              value={props.values.imageUrl}
            />

            <Button
              color="maroon"
              title="Submit"
              onPress={props.handleSubmit}
              style={{backgroundColor: 'maroon', borderColor:'#fff', borderWidth: 1}}
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
