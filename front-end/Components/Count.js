import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import propTypes from "prop-types";

export default function Count(props) {
  return (
    <View style={styles.footerComponent}>
      <Text style={styles.footerText}>{props.title}</Text>
      <Text style={styles.footerText}>{props.count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footerComponent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    fontSize: 20,
  },
});

Count.propTypes = {
  title: propTypes.string.isRequired,
  count: propTypes.number,
};

Count.defaultProps = {
  title: "Title",
};
