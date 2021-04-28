import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

function WelcomeTitle({ children, style, useLogo = true }) {
	return (
		<View style={[styles.titleContainer, style]}>
			{useLogo && (
				<Image
					source={require("../../assets/soundcloud.png")}
					style={{ width: 75, height: 75 }}
				/>
			)}
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
	},
	titleContainer: {
		alignItems: "center",
	},
});

export default WelcomeTitle;
