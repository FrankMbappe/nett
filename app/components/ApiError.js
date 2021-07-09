import React from "react";
import { View, StyleSheet } from "react-native";
import NettButton from "./Button";
import NettText from "./Text";

function ApiError({ show, onPressRetry }) {
	if (!show) return null;

	return (
		<View style={styles.container}>
			<NettText style={styles.text}>Couldn't connect to the server</NettText>
			<NettButton text="Retry" onPress={onPressRetry} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		height: "100%",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#ffffffcc",
	},
	text: {
		fontSize: 20,
		fontWeight: "bold",
		padding: 20,
	},
});

export default ApiError;
