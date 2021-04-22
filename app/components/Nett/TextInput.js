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
		borderRadius: 15,
		fontSize: 20,
		paddingHorizontal: 15,
		paddingVertical: 15,
		width: "100%",
	},
});

export default NettTextInput;
