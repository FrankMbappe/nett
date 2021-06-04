import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import images from "../../config/images";

function StartTitle({ children, style, useLogo = true }) {
	return (
		<View style={[styles.titleContainer, style]}>
			{useLogo && (
				<Image source={images.APP_ICON} style={{ width: 75, height: 75 }} />
			)}
			<NettText style={styles.textTitle}>{children}</NettText>
		</View>
	);
}

const styles = StyleSheet.create({
	textTitle: {
		fontWeight: "bold",
		fontSize: 24,
		textAlign: "center",
	},
	titleContainer: {
		alignItems: "center",
	},
});

export default StartTitle;
