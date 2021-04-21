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
		flex: 1,
		paddingTop: Constants.statusBarHeight,
		backgroundColor: colors.uiBack,
		padding: 5,
	},
});
export default Screen;
