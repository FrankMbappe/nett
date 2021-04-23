import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import colors from "../config/colors";
import enums from "../config/enums";

function Button({ style, text, type, onPress }) {
	return (
		<TouchableOpacity style={[styles(type).container, style]} onPress={onPress}>
			<Text style={styles(type).text}>{text}</Text>
		</TouchableOpacity>
	);
}

const styles = (buttonType) => {
	// Since buttons can be of different types, the main UI distinctions
	// are stored in back & front variables
	let back, front;
	switch (buttonType) {
		case enums.BUTTON_SECONDARY:
			back = colors.appBack;
			front = colors.dark;
			break;
		default:
			back = colors.appPrimary;
			front = colors.white;
			break;
	}
	return StyleSheet.create({
		container: {
			backgroundColor: back,
			justifyContent: "center",
			alignItems: "center",
			paddingHorizontal: 30,
			paddingVertical: 15,
			borderRadius: 10,
		},
		text: {
			color: front,
			fontSize: 16,
			textTransform: "uppercase",
			fontWeight: "bold",
		},
	});
};

export default Button;
