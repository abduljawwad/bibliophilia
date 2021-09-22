import React from 'react';

// keyboard avoiding view
import { KeyboardAvoidingView, Keyboard, ScrollView, TouchableWithoutFeedback } from 'react-native';

//colors
import colors from '../assets/colors';
const { mainBgColor } = colors


const KeyboardAvoidingWrapper = ({ children }) => {
  return (
    <KeyboardAvoidingView style ={{flex:1, backgroundColor: mainBgColor}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>{children}</TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingWrapper;