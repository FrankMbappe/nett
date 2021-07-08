import React, { useState } from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import { formatRelative } from "date-fns";

import { FileBundle, ImageBundle, VideoBundle } from "./bundles";
import Author from "./Author";
import Badge from "../Badge";
import CommentSection from "../CommentSection";
import LikeCommentShare from "./LikeCommentShare";
import NettText from "../Text";

import colors from "../../config/colors";
import { useCallback } from "react";
import { useEffect } from "react";
import { startsWith } from "lodash";
import { userFullName } from "../../utils";

function renderPostBundle(file, downloadProgress = 1) {
	if (startsWith(file.mimetype, "image"))
		return <ImageBundle imageUri={file.uri} />;

	if (startsWith(file.mimetype, "video"))
		return <VideoBundle duration="10:00" />;
	else return <FileBundle file={file} downloadProgress={downloadProgress} />;
}

function PostCard({
	userId,
	post: {
		author,
		creationDate,
		file,
		text,
		haveSeen = [],
		likes = [],
		comments = [],
	},
	classroomName,
	...otherProps
}) {
	const [likeList, setLikeList] = useState(likes);
	const [commentList, setCommentList] = useState(comments);
	const [modalIsVisible, setModalIsVisible] = useState(false);

	const hasBeenLiked = likeList.some((x) => x.userId === userId);

	const like = useCallback(() => {
		/* If the post has been liked already, I remove the userId from the likeList
		   otherwise I add the userId in the likeList */
		if (hasBeenLiked) setLikeList(likeList.filter((x) => x.userId !== userId));
		else
			setLikeList(
				likeList.concat({
					author: userId,
					date: new Date().toISOString(),
				})
			);
		/* I use the function concat() to mutate the array while returning
			the mutated value. */
	}, [hasBeenLiked, likeList]);
	const comment = useCallback(() => {
		setModalIsVisible(true);
	});
	const share = useCallback(() => {
		console.log("Shared");
	});
	const publishComment = useCallback((text, image) => {
		// TODO: commentList.push(new Comment)
	});

	useEffect(() => {
		// TODO: Mutate the likeList in the database
	}, [likeList]);
	useEffect(() => {
		// TODO: Mutate the commentList in the database
	}, [commentList]);

	return (
		<>
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
							{formatRelative(new Date(creationDate), new Date())}
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

						<LikeCommentShare
							isLiked={hasBeenLiked}
							likeCount={likeList.length}
							commentCount={
								comments.length +
								comments.flatMap((comment) => comment.replies).length
							}
							onPressLike={like}
							onPressComment={comment}
							onPressShare={share}
						/>

						<Author
							name={userFullName({ ...author.profile })}
							picUri={{ uri: author.profile.picUri }}
							classroomName={classroomName}
						/>
					</View>
				</>
			</TouchableHighlight>

			{/* Comment section */}
			<CommentSection
				isVisible={modalIsVisible}
				isLiked={hasBeenLiked}
				comments={comments}
				onPressBack={() => setModalIsVisible(false)}
				onPressLike={like}
				onPublish={(input) => publishComment(...input)}
			/>
		</>
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
		flex: 1,
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
