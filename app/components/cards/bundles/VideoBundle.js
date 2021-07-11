import React from "react";
import { View, StyleSheet } from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";

import colors from "../../../config/colors";

function VideoBundle({ uri }) {
	const video = React.useRef(null);
	const [status, setStatus] = React.useState({});

	return (
		<View style={styles.container}>
			<Video
				ref={video}
				style={styles.video}
				source={{
					uri: uri,
				}}
				useNativeControls
				resizeMode="contain"
				isLooping
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
		backgroundColor: colors.dark,
	},
	controlsContainer: {
		flex: 1,
		backgroundColor: "#00000080",
		justifyContent: "center",
		alignItems: "center",
	},
	video: {
		alignSelf: "center",
		width: "100%",
		height: "100%",
	},
	videoDuration: {
		bottom: 15,
		color: colors.white,
		end: 15,
		position: "absolute",
	},
	videoProgressContainer: {
		backgroundColor: "#FFFFFF80",
		position: "absolute",
		bottom: 0,
		width: "100%",
		height: 7,
	},
});

export default VideoBundle;
