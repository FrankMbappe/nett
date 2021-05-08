import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import colors from "../../config/colors";
import images from "../../config/images";
import NettText from "../Text";
import TextIcon from "../TextIcon";
import Author from "./Author";

function renderPostBundle({ file }) {
	switch (file.type.toLowerCase()) {
		case "image":
			return (
				<View>
					<Image
						style={{ width: "100%", height: 200 }}
						source={{ uri: file.uri }}
					/>
				</View>
			);
		case "video":
			return <NettText>Video</NettText>;
		default:
			return <NettText>{type}</NettText>;
	}
}

function PostCard({ post, ...otherProps }) {
	return (
		<TouchableOpacity
			style={[styles.container, otherProps.style]}
			onPress={otherProps.onPress}
		>
			<View style={styles.headContainer}>
				<NettText>{post.createdOn}</NettText>
			</View>

			{post.file && renderPostBundle(post)}

			<View style={styles.mainContainer}>
				<NettText style={styles.text} numberOfLines={post.file ? 3 : 0}>
					{post.text}
				</NettText>

				<Author
					name={post.author.profile.fullName}
					pic={{ uri: post.author.profile.picUrl }}
					style={{ marginTop: 10 }}
				/>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.appBack,
		borderRadius: 10,
		elevation: 3,
		marginEnd: 5,
		shadowColor: "#000",
		maxWidth: 275,
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		marginBottom: 10,
	},
	headContainer: {
		padding: 10,
	},
	mainContainer: {
		padding: 10,
	},
	text: {
		textAlign: "justify",
	},
});

export default PostCard;
