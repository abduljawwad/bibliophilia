import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";

export default function Button(props) {
  const { onPress, style, children } = props;
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <View>{children}</View>
    </TouchableOpacity>
  );
}
