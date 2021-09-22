import React from 'react';

// keyboard avoiding view
import { KeyboardAvoidingView, Keyboard, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

//colors
import colors from '../assets/colors';
const { mainBgColor } = colors


const KeyboardAvoidingWrapper = ({ children }) => {
  return (
		<>
		<SafeAreaView style={{backgroundColor: mainBgColor}}/>
			<KeyboardAvoidingView style ={{flex:1, backgroundColor: mainBgColor}}>
				<ScrollView>
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>{children}</TouchableWithoutFeedback>
				</ScrollView>
			</KeyboardAvoidingView>
		<SafeAreaView style={{backgroundColor: mainBgColor}}/>
	</>

  );
};

export default KeyboardAvoidingWrapper;