import React from "react";
import { StyleSheet } from "react-native";
import colors from "../config/colors";
import ButtonIcon from "./ButtonIcon";

function FloatingButton({
	icon,
	style,
	backgroundColor = colors.appPrimary,
	iconColor = colors.white,
	onPress,
}) {
	return (
		<ButtonIcon
			containerStyle={[
				styles.container,
				{ backgroundColor: backgroundColor },
				style,
			]}
			name={icon}
			color={iconColor}
			onPress={onPress}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		height: 60,
		width: 60,
		borderRadius: 30,
		bottom: 40,
		end: 20,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.27,
		shadowRadius: 4.65,

		elevation: 6,
	},
});

export default FloatingButton;
