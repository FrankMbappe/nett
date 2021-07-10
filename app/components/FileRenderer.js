import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";
import ButtonIcon from "./ButtonIcon";
import { ImageBundle, VideoBundle } from "./cards/bundles";

function FileRenderer({ file, type, onDelete }) {
	if (!file || !type) return null;

	// TODO: Other file bundle (e.g, PDF)
	return (
		<>
			{String(type).includes("image") ? (
				<ImageBundle imageUri={file.uri} />
			) : String(type).includes("video") ? (
				<VideoBundle duration="10:00" />
			) : null}
			<ButtonIcon
				containerStyle={styles.closeButton}
				name="close"
				size={20}
				onPress={onDelete}
			/>
		</>
	);
}

const styles = StyleSheet.create({
	closeButton: {
		position: "absolute",
		top: 24,
		end: 15,
		backgroundColor: colors.white,
		padding: 5,
		borderRadius: 25,
	},
});

export default FileRenderer;
