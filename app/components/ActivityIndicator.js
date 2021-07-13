import React from "react";
import LottieView from "lottie-react-native";

function ActivityIndicator({ style, visible = false, type = "default" }) {
	if (!visible) return null;

	return (
		<LottieView
			source={
				type === "video"
					? require("../assets/animations/videoLoader.json")
					: require("../assets/animations/loaderAlt.json")
			}
			style={style}
			autoPlay
			loop
		/>
	);
}

export default ActivityIndicator;
