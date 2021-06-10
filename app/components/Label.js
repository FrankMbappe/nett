import React from "react";
import { StyleSheet } from "react-native";
import NettText from "./Text";

function Label({ value, style }) {
	return <NettText style={[styles.label, style]}>{value}</NettText>;
}

const styles = StyleSheet.create({
	label: {
		fontSize: 16,
		fontWeight: "bold",
		marginStart: 10,
		marginBottom: 5,
	},
});

export default Label;
