import React from "react";
import { View, StyleSheet } from "react-native";

function TopBar({ children, style }) {
	return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flexDirection: "row",
		height: 60,
		width: "100%",
	},
});

export default TopBar;
