import React from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import { formatRelative } from "date-fns";

import { FileBundle, ImageBundle, VideoBundle } from "./bundles";
import Author from "./Author";
import Badge from "../Badge";
import NettText from "../Text";

import colors from "../../config/colors";

function renderPostBundle(file) {
	switch (file.type.toLowerCase()) {
		case "image":
			return <ImageBundle imageUri={file.uri} />;
		case "video":
			return <VideoBundle duration="10:00" />;
		default:
			return <FileBundle {...file} />;
	}
}

function PostCard({
	userId,
	post: { author, createdOn, file, haveSeen, text },
	...otherProps
}) {
	return (
		<TouchableHighlight
			style={[styles.container, otherProps.style]}
			onPress={otherProps.onPress}
			underlayColor={colors.light}
		>
			<>
				<View style={styles.headContainer}>
					{/* Display badge only if the user has never seen the post */}
					{!haveSeen.includes(userId) && <Badge style={{ marginEnd: 5 }} />}

					<NettText style={styles.postType}>POST</NettText>
					<NettText style={styles.createdOn}>
						{formatRelative(new Date(createdOn), new Date())}
					</NettText>
				</View>

				{file && renderPostBundle(file)}

				<View style={styles.contentContainer}>
					<NettText
						style={[styles.text, { fontSize: 16 }]}
						numberOfLines={file ? 4 : 0}
					>
						{text}
					</NettText>

					<Author
						name={author.profile.fullName}
						pic={{ uri: author.profile.picUri }}
						style={{ marginTop: 10 }}
					/>
				</View>
			</>
		</TouchableHighlight>
	);
}

const styles = StyleSheet.create({
	bundleContainer: {
		marginTop: 10,
		backgroundColor: colors.mediumLight,
	},
	createdOn: {
		color: colors.medium,
		fontWeight: "600",
	},
	container: {
		backgroundColor: colors.appBack,
		borderRadius: 10,
		elevation: 3,
		marginEnd: 5,
		maxWidth: 330,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		marginBottom: 10,
	},
	contentContainer: {
		padding: 10,
	},
	headContainer: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
		paddingBottom: 0,
	},
	postType: {
		fontWeight: "bold",
		flex: 1,
	},
	text: {
		textAlign: "justify",
		fontSize: 15,
	},
});

export default PostCard;
