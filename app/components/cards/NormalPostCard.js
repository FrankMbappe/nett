import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import { formatRelative } from "date-fns";

import Author from "./Author";
import Badge from "../Badge";
import CommentSection from "../CommentSection";
import FileRenderer from "../FileRenderer";
import LikeCommentShare from "./LikeCommentShare";
import NettText from "../Text";
import colors from "../../config/colors";

function getFontSize(text, hasFile) {
	if (!text || hasFile) return 18;

	if (text.length > 100) return 16;
	if (text.length > 50) return 22;
	return 28;
}

function NormalPostCard({
	// Data
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
	const [likeList, setLikeList] = useState(likes);

	// If the post has been liked by the current user
	const [hasBeenLiked, setHasBeenLiked] = useState(
		likeList.some((like) => like.author === currentUserId)
	);

	// Effects
	useEffect(() => {
		setHasBeenLiked(likeList.some((like) => like.author === currentUserId));
	}, [likeList]);

	// Action handlers
	const onPressComment = () => {
		setModalIsVisible(true);
	};
	const handleLike = () => {
		const like = { author: currentUserId };

		if (!hasBeenLiked) setLikeList((prevValue) => prevValue.concat(like));
		else
			setLikeList((prevValue) =>
				prevValue.filter(({ author }) => author !== currentUserId)
			);
		// Call API?
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

						<NettText style={styles.postType}>Post</NettText>

						<NettText style={styles.creationDate}>
							{formatRelative(new Date(creationDate), new Date())}
						</NettText>
					</View>

					{/* IMAGE/VIDEO */}
					<FileRenderer file={file} type={file && file.mimetype} />

					{/* BODY & FOOTER */}
					<View style={styles.contentContainer}>
						{/* Text */}
						{text && (
							<NettText
								style={[
									styles.text,
									{ fontSize: getFontSize(text, file != null) },
								]}
								// Limit lines depending on whether or not there's a file
								numberOfLines={file ? 4 : 0}
							>
								{text}
							</NettText>
						)}

						{/* Comment bar */}
						<LikeCommentShare
							isLiked={hasBeenLiked}
							likeCount={likeList.length}
							commentCount={comments.length}
							onPressLike={handleLike}
							onPressComment={onPressComment}
							onPressShare={onShare}
						/>

						{/* Footer */}
						<Author
							user={{
								fullName: authorFullName,
								picUri: authorPicUri,
							}}
							classroomName={classroomName}
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
				onPressLike={handleLike}
				onPublish={(text) => onPublishComment && onPublishComment(text)}
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
		fontSize: 16,
	},
});

export default NormalPostCard;
