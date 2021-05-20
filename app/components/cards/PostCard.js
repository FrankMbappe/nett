import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import { formatRelative } from "date-fns";

import { FileBundle, ImageBundle, VideoBundle } from "./bundles";
import Author from "./Author";
import Badge from "../Badge";
import NettText from "../Text";

import colors from "../../config/colors";
import LikeCommentShare from "./LikeCommentShare";

function renderPostBundle(file, downloadProgress = 1) {
	switch (file.type.toLowerCase()) {
		case "image":
			return <ImageBundle imageUri={file.uri} />;
		case "video":
			return <VideoBundle duration="10:00" />;
		default:
			return <FileBundle file={file} downloadProgress={downloadProgress} />;
	}
}

function PostCard({
	userId,
	post: { author, createdOn, file, haveSeen, text, likes = [], comments = [] },
	classroomName,
	...otherProps
}) {
	const [likeList, setLikeList] = useState(likes);

	//#region - TIMER COUNTDOWN
	const [timerLeft, setTimerLeft] = useState(0);
	useEffect(() => {
		const timer = setTimeout(() => {
			if (timerLeft >= 100) return;
			setTimerLeft(timerLeft + 1);
		}, 1000);
		return () => clearTimeout(timer);
	});
	//#endregion

	const hasBeenLiked = likeList.some((x) => x.userId === userId);

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

				{file && renderPostBundle(file, timerLeft / 100)}

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
						onPressLike={() => {
							console.log("Liked");
							if (hasBeenLiked)
								setLikeList(likeList.filter((x) => x.userId !== userId));
							else
								setLikeList(
									likeList.concat({
										date: new Date().toISOString(),
										userId: userId,
									})
								);
							/* I use the function concat() to mutate the array while returning
							   the mutated value. */

							// TODO: Mutate the number of likes in the database

							alert(likes.length);
						}}
						onPressComment={() => console.log("Commented on")}
						onPressShare={() => console.log("Shared")}
					/>

					<Author
						name={author.profile.fullName}
						picUri={{ uri: author.profile.picUri }}
						classroomName={classroomName}
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
