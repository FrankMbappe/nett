import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import NettText from "../../Text";
import ButtonIcon from "../../ButtonIcon";
import colors from "../../../config/colors";

function VideoBundle({ duration = "00:00" }) {
	return (
		<View style={styles.container}>
			<View style={{ width: "100%", height: 250 }}>
				<TouchableOpacity style={styles.controlsContainer}>
					<ButtonIcon name="play" size={75} color={colors.white} />
				</TouchableOpacity>

				<NettText style={styles.videoDuration}>{duration}</NettText>

				<View style={styles.videoProgressContainer}>
					<View
						style={{
							backgroundColor: colors.danger,
							height: "100%",
							width: "75%",
						}}
					/>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 10,
		backgroundColor: colors.mediumLight,
	},
	controlsContainer: {
		flex: 1,
		backgroundColor: "#00000080",
		justifyContent: "center",
		alignItems: "center",
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
