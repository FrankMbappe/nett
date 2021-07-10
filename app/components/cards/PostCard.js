import React, { useState } from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import { formatRelative } from "date-fns";

import Author from "./Author";
import Badge from "../Badge";
import CommentSection from "../CommentSection";
import FileRenderer from "../FileRenderer";
import LikeCommentShare from "./LikeCommentShare";
import NettText from "../Text";
import colors from "../../config/colors";
import currentUser from "../../config/test";

function PostCard({
	// Data
	currentUserId,
	post: {
		creationDate,
		author: { fullName: authorFullName, picUri: authorPicUri },
		file,
		text,
		classroom: classroomName,
		haveSeen = [],
		likes = [],
		comments = [],
	},

	// UI
	style,
	onPress,
	onLike,
	onPublishComment,
	onShare,
}) {
	// States
	const [modalIsVisible, setModalIsVisible] = useState(false);

	// If the post has been liked by the current user
	const hasBeenLiked = likes.some((like) => like.author === currentUserId);

	// Action handlers
	const onPressComment = () => {
		setModalIsVisible(true);
	};

	return (
		<>
			{/* CARD */}
			<TouchableHighlight
				style={[styles.container, style]}
				onPress={onPress}
				underlayColor={colors.light}
			>
				<>
					{/* HEADER */}
					<View style={styles.headContainer}>
						{/* Display badge only if the user has never seen the post */}
						{!haveSeen.includes(currentUserId) && (
							<Badge style={{ marginEnd: 5 }} />
						)}

						<NettText style={styles.postType}>POST</NettText>

						<NettText style={styles.creationDate}>
							{formatRelative(new Date(creationDate), new Date())}
						</NettText>
					</View>

					{/* IMAGE/VIDEO */}
					<FileRenderer file={file} />

					{/* BODY & FOOTER */}
					<View style={styles.contentContainer}>
						{/* Text */}
						<NettText
							style={[styles.text, { fontSize: 16 }]}
							// Limit lines depending on whether or not there's a file
							numberOfLines={file ? 4 : 0}
						>
							{text}
						</NettText>

						{/* Comment bar */}
						<LikeCommentShare
							isLiked={hasBeenLiked}
							likeCount={likes.length}
							commentCount={comments.length}
							onPressLike={onLike}
							onPressComment={onPressComment}
							onPressShare={onShare}
						/>

						{/* Footer */}
						<Author
							user={{
								fullName: authorFullName,
								picUri: currentUser.hostname + authorPicUri,
							}}
							name={classroomName}
						/>
					</View>
				</>
			</TouchableHighlight>

			{/* MODAL */}
			<CommentSection
				isVisible={modalIsVisible}
				isLiked={hasBeenLiked}
				comments={comments}
				onPressBack={() => setModalIsVisible(false)}
				onPressLike={onLike}
				onPublish={(text) => onPublishComment(text)}
			/>
		</>
	);
}

const styles = StyleSheet.create({
	bundleContainer: {
		marginTop: 10,
		backgroundColor: colors.mediumLight,
	},
	creationDate: {
		color: colors.medium,
		fontWeight: "600",
	},
	container: {
		backgroundColor: colors.appBack,
		borderRadius: 10,
		elevation: 3,
		flex: 1,
		width: 320,
		flexGrow: 0,
		margin: 5,
		maxWidth: 350,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
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
