import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import Constants from "expo-constants";

import colors from "../config/colors";

function Screen({ children, style }) {
	return (
		<SafeAreaView style={[styles.container, styles.screen, style]}>
			<View style={[styles.container, style]}>{children}</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, width: "100%", height: "100%", padding: 5 },
	screen: {
		alignSelf: "center",
		backgroundColor: colors.appBack,
		maxWidth: 500,
		marginTop: Constants.statusBarHeight,
	},
});
export default Screen;
