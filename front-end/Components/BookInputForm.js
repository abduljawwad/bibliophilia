import React from "react";
import { StyleSheet, Button, TextInput, View, Text, SafeAreaView } from "react-native";
import { Formik } from "formik";
import * as yup from 'yup'
import CustomButton from "../Components/Button";
import { Ionicons } from "@expo/vector-icons";
import colors from "../assets/colors";

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

export default function BookInputForm({ addFormValues, hideAddBookBar }) {

  return (
    <View style={styles.container}>
      <CustomButton
        onPress={hideAddBookBar}
        style={{
          ...styles.btnView,
          alignSelf: "flex-end",
          width: '40%',
          marginBottom: 30,  
        }}
      > 
        <Text style={styles.btnText}>Close</Text>
      </CustomButton>
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
              placeholder="Enter book title"
              placeholderTextColor={colors.textColor}
              onChangeText={props.handleChange("title")}
              value={props.values.title}
              onBlur={props.handleBlur('title')}
            />
            <Text style={styles.errorMessage}>{props.touched.title && props.errors.title}</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter author Name"
              placeholderTextColor={colors.textColor}
              onChangeText={props.handleChange("author")}
              value={props.values.author}
              onBlur={props.handleBlur('author')}
            />
            <Text style={styles.errorMessage}>{props.touched.author && props.errors.author}</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter Genre"
              placeholderTextColor={colors.textColor}
              onChangeText={props.handleChange("genre")}
              value={props.values.genre}
              onBlur={props.handleBlur('genre')}
            />
            <Text style={styles.errorMessage}>{props.touched.genre && props.errors.genre}</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter Image URL"
              placeholderTextColor={colors.textColor}
              onChangeText={props.handleChange("imageUrl")}
              value={props.values.imageUrl}
              onBlur={props.handleBlur('imageUrl')}
            />
            <Text style={styles.errorMessage}>{props.touched.imageUrl && props.errors.imageUrl}</Text>

            <CustomButton
              color={colors.textColor}
              title="Submit"
              onPress={props.handleSubmit}
              style={styles.btnView}
            >
              <Text style={styles.btnText}>Submit</Text>
            </CustomButton>
          </View>
        )}
      </Formik>
      <SafeAreaView style={styles.SafeAreaView} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: 20,
    backgroundColor: colors.mainBgColor,
  },
  SafeAreaView:{
    backgroundColor: colors.mainBgColor,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    color: colors.textColor,
  },
  errorMessage: {
    textAlign: 'center',
    fontWeight:'bold',
    color: colors.errorMessage,
    marginBottom: 10,
    marginTop: 5,
  },
  btnView:{
    backgroundColor: colors.primaryColor,
    width: '100%',
    padding: 10,
    borderRadius: 6,
    marginBottom: 15,
  },
  btnText:{
    textTransform:'uppercase',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textColor,
  }
});
