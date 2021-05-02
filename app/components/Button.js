import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import colors from "../config/colors";
import { buttons } from "../config/enums";

// --- Kind of buttons --- //
const buttonTypes = {
	[buttons.PRIMARY]: {
		backColor: colors.appPrimary,
		frontColor: colors.white,
	},
	[buttons.SECONDARY]: {
		backColor: colors.appBack,
		frontColor: colors.appFront,
	},
	[buttons.TERTIARY]: {
		backColor: colors.lighter,
		frontColor: colors.dark,
	},
};

function Button({ style, text, onPress, disabled, type = buttons.PRIMARY }) {
	return (
		<TouchableOpacity
			disabled={disabled}
			style={[styles(type).container, style]}
			onPress={onPress}
		>
			<Text style={styles(type).text}>{text}</Text>
		</TouchableOpacity>
	);
}

const styles = (buttonType) => {
	return StyleSheet.create({
		container: {
			backgroundColor: buttonTypes[buttonType].backColor,
			justifyContent: "center",
			alignItems: "center",
			paddingHorizontal: 30,
			paddingVertical: 15,
			borderRadius: 10,
		},
		text: {
			color: buttonTypes[buttonType].frontColor,
			fontSize: 16,
			textTransform: "uppercase",
			fontWeight: "bold",
		},
	});
};

export default Button;
