import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import { buttons } from "../config/enums";
import NettText from "./Text";

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

function NettButton({
	icon,
	text,
	disabled,
	fontSize = 17,
	type = buttons.PRIMARY,
	...otherProps
}) {
	return (
		<TouchableOpacity
			disabled={disabled}
			style={[styles(type, disabled).container, otherProps.style]}
			onPress={otherProps.onPress}
		>
			{icon && (
				<MaterialCommunityIcons
					name={icon}
					size={fontSize * 1.5}
					color={buttonTypes[type].frontColor}
					style={{ marginEnd: text ? fontSize * 0.65 : 0 }}
				/>
			)}
			{text && (
				<NettText style={[styles(type).text, { fontSize }]}>{text}</NettText>
			)}
		</TouchableOpacity>
	);
}

const styles = (buttonType, disabled = false) => {
	return StyleSheet.create({
		container: {
			backgroundColor: buttonTypes[buttonType].backColor,
			justifyContent: "center",
			alignItems: "center",
			flexDirection: "row",
			paddingHorizontal: 30,
			paddingVertical: 15,
			borderRadius: 25,
			opacity: disabled ? 0.25 : 1,
		},
		text: {
			color: buttonTypes[buttonType].frontColor,
			fontSize: 16,
			textTransform: "uppercase",
			fontWeight: "bold",
		},
	});
};

export default NettButton;
