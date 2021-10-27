import React from "react";
import { StyleSheet, Button, TextInput, View, Text } from "react-native";
import { Formik } from "formik";
import * as yup from 'yup'
import colors from '../assets/colors'

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
              placeholder="Book title"
              onChangeText={props.handleChange("title")}
              value={props.values.title}
              onBlur={props.handleBlur('title')}
            />
            <Text style={styles.errorMessage}>{props.touched.title && props.errors.title}</Text>

            <TextInput
              style={styles.input}
              placeholder="Author Name"
              onChangeText={props.handleChange("author")}
              value={props.values.author}
              onBlur={props.handleBlur('author')}
            />
            <Text style={styles.errorMessage}>{props.touched.author && props.errors.author}</Text>

            <TextInput
              style={styles.input}
              placeholder="Genre"
              onChangeText={props.handleChange("genre")}
              value={props.values.genre}
              onBlur={props.handleBlur('genre')}
            />
            <Text style={styles.errorMessage}>{props.touched.genre && props.errors.genre}</Text>

            <TextInput
              style={styles.input}
              placeholder="Image URL"
              onChangeText={props.handleChange("imageUrl")}
              value={props.values.imageUrl}
              onBlur={props.handleBlur('imageUrl')}
            />
            <Text style={styles.errorMessage}>{props.touched.imageUrl && props.errors.imageUrl}</Text>

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
  errorMessage: {
    textAlign: 'center',
    fontWeight:'bold',
    color: colors.errorMessage,
    marginBottom: 10,
    marginTop: 5,
  }
});
