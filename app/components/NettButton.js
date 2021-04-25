import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import colors from "../config/colors";
import enums from "../config/enums";

// --- Kind of buttons --- //
const buttons = {
	[enums.BUTTON_PRIMARY]: {
		backColor: colors.appPrimary,
		frontColor: colors.white,
	},
	[enums.BUTTON_SECONDARY]: {
		backColor: colors.appBack,
		frontColor: colors.appFront,
	},
	[enums.BUTTON_TERTIARY]: {
		backColor: colors.lighter,
		frontColor: colors.dark,
	},
};

function Button({ style, text, onPress, type = enums.BUTTON_PRIMARY }) {
	return (
		<TouchableOpacity style={[styles(type).container, style]} onPress={onPress}>
			<Text style={styles(type).text}>{text}</Text>
		</TouchableOpacity>
	);
}

const styles = (buttonType) => {
	return StyleSheet.create({
		container: {
			backgroundColor: buttons[buttonType].backColor,
			justifyContent: "center",
			alignItems: "center",
			paddingHorizontal: 30,
			paddingVertical: 15,
			borderRadius: 10,
		},
		text: {
			color: buttons[buttonType].frontColor,
			fontSize: 16,
			textTransform: "uppercase",
			fontWeight: "bold",
		},
	});
};

export default Button;
