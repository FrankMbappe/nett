import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Linking from "expo-linking";

import colors from "../../../config/colors";
import { bytesToSize } from "../../../utils";
import NettText from "../../Text";
import TextIcon from "../../TextIcon";
import Toast from "react-native-root-toast";

function getDownloadStatus(progress) {
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
}

const nettDownloadFolder = FileSystem.documentDirectory + "nett/";

function FileBundle({
	file: { uri: fileUri, name: fileName, extension: fileExt, size: fileSize },
	fileCanBeDownloaded = false,
}) {
	// States
	const [downloadProgress, setDownloadProgress] = useState(0);
	const downloadStatus = useMemo(
		() => getDownloadStatus(downloadProgress),
		[downloadProgress]
	);
	const filePath = useMemo(() => nettDownloadFolder + fileName, []);

	// Effects
	useEffect(() => {
		if (fileExists || !fileCanBeDownloaded) setDownloadProgress(1);
	}, []);

	// Action handlers
	const handleDownloadProgress = (downloadProgress) => {
		const progress =
			downloadProgress.totalBytesWritten /
			downloadProgress.totalBytesExpectedToWrite;
		setDownloadProgress(progress);
	};
	const handlePress = async () => {
		// If the file already exists, I open it
		if (fileExists || !fileCanBeDownloaded) {
			Linking.openURL(filePath);
		} else {
			// Else, it gets downloaded
			try {
				// I ensure that the download directory already exists
				await ensureDirExists();

				// The download starts..
				const downloadResumable = FileSystem.createDownloadResumable(
					fileUri,
					filePath,
					{},
					handleDownloadProgress
				);
				const { uri } = await downloadResumable.downloadAsync();
				console.log("Finished downloading to ", uri);
			} catch (e) {
				console.error(e);
			}
		}
	};
	const ensureDirExists = async () => {
		const dirInfo = await FileSystem.getInfoAsync(nettDownloadFolder);
		if (!dirInfo.exists) {
			Toast.show("Download directory doesn't exist, creating...");
			await FileSystem.makeDirectoryAsync(nettDownloadFolder, {
				intermediates: true,
			});
		}
	};
	const fileExists = async () => {
		const fileInfo = await FileSystem.getInfoAsync(filePath);
		return fileInfo.exists;
	};

	return (
		<TouchableOpacity style={styles.container} onPress={handlePress}>
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
							{fileExt}
						</NettText>
					</View>

					<View style={{ flex: 1 }}>
						<NettText style={styles.name} numberOfLines={2}>
							{fileName}
						</NettText>

						<NettText style={{ fontSize: 12 }} numberOfLines={1}>
							{`${fileExt.toUpperCase()} File | ${bytesToSize(fileSize)}`}
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
