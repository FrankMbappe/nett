import React from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import colors from "../config/colors";

function ActivityIndicator({ style, visible = false, type = "default" }) {
	if (!visible) return null;

	return (
		<View style={[styles.container, style]}>
			<LottieView
				source={
					type === "video"
						? require("../assets/animations/videoLoader.json")
						: require("../assets/animations/loaderAlt.json")
				}
				autoPlay
				loop
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		backgroundColor: colors.appBack,
		height: "100%",
		opacity: 0.8,
		width: "100%",
		zIndex: 1,
	},
});

export default ActivityIndicator;
