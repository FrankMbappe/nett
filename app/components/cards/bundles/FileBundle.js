import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../../config/colors";
import { bytesToSize } from "../../../utils";
import NettText from "../../Text";
import TextIcon from "../../TextIcon";

const getDownloadStatus = (progress) => {
	if (progress === 1) return { id: "downloaded", text: "File", icon: "pin" };
	else if (progress > 0 && progress < 1)
		return {
			id: "downloading",
			text: "Downloading...",
			icon: "cloud-download-outline",
		};
	else
		return {
			id: "notyet",
			text: "Tap to download the file",
			icon: "download",
		};
};

function FileBundle({
	file: { name, extension, size },
	downloadProgress = 1,
	onPress,
}) {
	const downloadStatus = getDownloadStatus(downloadProgress);
	console.log(downloadProgress);

	return (
		<TouchableOpacity style={styles.container} onPress={onPress}>
			{downloadStatus.id === "downloading" && (
				<View
					style={[
						styles.downloadProgressBar,
						{ width: downloadProgress * 100 + "%" },
					]}
				/>
			)}
			<View style={styles.subContainer}>
				<TextIcon
					icon={downloadStatus.icon}
					text={downloadStatus.text}
					color={colors.medium}
					fontSize={11}
				/>

				<View style={styles.descriptionContainer}>
					<View style={styles.extensionLabel}>
						<NettText style={styles.extension} numberOfLines={1}>
							{extension}
						</NettText>
					</View>

					<View style={{ flex: 1 }}>
						<NettText style={styles.name} numberOfLines={2}>
							{name}
						</NettText>

						<NettText style={{ fontSize: 12 }} numberOfLines={1}>
							{`${extension.toUpperCase()} File | ${bytesToSize(size)}`}
						</NettText>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.light,
		borderRadius: 10,
		elevation: 3,
		height: 100,
		margin: 15,
		marginBottom: 5,
		maxWidth: 330,
		paddingHorizontal: 12,
		paddingVertical: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
	},
	descriptionContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
	},
	downloadProgressBar: {
		position: "absolute",
		borderRadius: 10,
		borderTopEndRadius: 0,
		borderBottomEndRadius: 0,
		height: 100,
		backgroundColor: "#b6d1bf",
	},
	extension: {
		fontWeight: "bold",
		textTransform: "uppercase",
		color: colors.white,
	},
	extensionLabel: {
		alignItems: "center",
		backgroundColor: colors.danger,
		height: "90%",
		justifyContent: "center",
		marginEnd: 10,
		borderRadius: 5,
		width: 50,
	},
	name: {
		fontSize: 16,
		fontWeight: "bold",
	},
	subContainer: {
		flex: 1,
	},
});

export default FileBundle;
