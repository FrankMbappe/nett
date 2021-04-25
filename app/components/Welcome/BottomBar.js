import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../config/colors";

import NettButton from "../NettButton";

function WelcomeBottomBar({ style, buttonStart, buttonEnd }) {
	return (
		<View style={[styles.bottomBar, style]}>
			<NettButton {...buttonStart} />
			<NettButton {...buttonEnd} />
		</View>
	);
}

const styles = StyleSheet.create({
	bottomBar: {
		position: "absolute",
		bottom: 0,
		padding: 25,
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		borderColor: "green",
		borderWidth: 0,
		backgroundColor: colors.appBack,
	},
});

export default WelcomeBottomBar;
