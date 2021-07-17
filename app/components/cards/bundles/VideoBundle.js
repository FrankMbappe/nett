import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";

import ActivityIndicator from "../../ActivityIndicator";

function VideoBundle({
	uri,
	containerStyle,
	isMuted = false,
	useNativeControls = true,
	shouldPlay = false,
	resizeMode = "cover",
}) {
	const video = React.useRef(null);
	const [status, setStatus] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	return (
		<View style={[styles.container, containerStyle]}>
			<ActivityIndicator
				style={styles.loader}
				visible={isLoading}
				type="video"
			/>
			<Video
				ref={video}
				style={styles.video}
				source={{
					uri: uri,
				}}
				useNativeControls={useNativeControls}
				shouldPlay={shouldPlay}
				isMuted={isMuted}
				resizeMode={resizeMode}
				isLooping
				onLoadStart={() => setIsLoading(true)}
				onLoad={() => setIsLoading(false)}
				onPlaybackStatusUpdate={(status) => setStatus(() => status)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 10,
		width: "100%",
		height: 250,
		backgroundColor: "black",
	},
	video: {
		alignSelf: "center",
		width: "100%",
		height: "100%",
		borderRadius: 10,
	},
	loader: {
		backgroundColor: "black",
		height: "100%",
		alignSelf: "center",
	},
});

export default VideoBundle;
