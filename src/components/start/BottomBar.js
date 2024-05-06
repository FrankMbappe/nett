import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../config/colors";

function StartBottomBar({
	style,
	buttonStart: ButtonStart,
	buttonEnd: ButtonEnd,
}) {
	return (
		<View style={[styles.bottomBar, style]}>
			{ButtonStart}
			{ButtonEnd}
		</View>
	);
}

const styles = StyleSheet.create({
	bottomBar: {
		backgroundColor: colors.appBack,
		padding: 25,
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
	},
});

export default StartBottomBar;
