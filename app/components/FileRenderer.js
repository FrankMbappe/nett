import React from "react";
import { StyleSheet } from "react-native";
import colors from "../config/colors";
import currentUser from "../config/test";
import ButtonIcon from "./ButtonIcon";
import { FileBundle, ImageBundle, VideoBundle } from "./cards/bundles";

function FileRenderer({
	file,
	type,
	onDelete,
	showDelete = false,
	canBeDownloaded = true,
}) {
	if (!file || !type) return null;

	// TODO: Other file bundle (e.g, PDF)
	return (
		<>
			{
				String(type).includes("image") ? (
					<ImageBundle uri={currentUser.hostname + file.uri} />
				) : String(type).includes("video") ? (
					<VideoBundle uri={currentUser.hostname + file.uri} />
				) : (
					<FileBundle file={file} fileCanBeDownloaded={canBeDownloaded} />
				)
				// ) : // <FileBundle file={{ ...file, uri: currentUser.hostname + uri }} />
			}
			{showDelete && (
				<ButtonIcon
					containerStyle={styles.closeButton}
					name="close"
					size={20}
					onPress={onDelete}
				/>
			)}
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
