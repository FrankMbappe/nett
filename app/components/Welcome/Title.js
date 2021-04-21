import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

function WelcomeTitle({ children, style }) {
	return (
		<View style={[styles.titleContainer, style]}>
			<Image
				source={require("../../assets/soundcloud.png")}
				style={{ width: 75, height: 75 }}
			/>
			<Text style={styles.textTitle}>{children}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	textTitle: {
		fontFamily: "Roboto",
		fontWeight: "bold",
		fontSize: 24,
		textAlign: "center",
		paddingTop: "15%",
	},
	titleContainer: {
		alignItems: "center",
	},
});

export default WelcomeTitle;
