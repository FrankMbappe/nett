import React from "react";
import { Text, StyleSheet } from "react-native";

function TinyDescriptionText({ children, style }) {
	return <Text style={[styles.text, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
	text: {
		color: "grey",
		textAlign: "center",
		fontSize: 14,
	},
});

export default TinyDescriptionText;
