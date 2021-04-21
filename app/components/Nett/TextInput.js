import React from "react";
import { TextInput, StyleSheet } from "react-native";

import colors from "../../config/colors";

function NettTextInput({ style, placeholder }) {
	return (
		<TextInput style={[styles.textInput, style]} placeholder={placeholder} />
	);
}

const styles = StyleSheet.create({
	textInput: {
		backgroundColor: colors.uiInput,
		paddingHorizontal: 15,
		paddingVertical: 15,
		fontSize: 20,
		borderRadius: 15,
	},
});

export default NettTextInput;
