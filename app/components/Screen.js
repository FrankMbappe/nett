import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Constants from "expo-constants";

import colors from "../config/colors";

function Screen({ children, style }) {
	return (
		<SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		alignSelf: "center",
		backgroundColor: colors.uiBack,
		flex: 1,
		maxWidth: 500,
		padding: 5,
		paddingTop: Constants.statusBarHeight,
		width: "100%",
	},
});
export default Screen;
