import React, { useState } from "react";
import { View, StyleSheet, Image, Pressable, FlatList } from "react-native";
import { formatDistanceToNowStrict, parseISO } from "date-fns";
import Badge from "./Badge";
import NettText from "./Text";
import colors from "../config/colors";
import { accountTypes } from "../config/enums";

function getStyleFromAccountType(accountType) {
	const style = (label = colors.appFront, back = colors.lighter) => ({
		labelColor: label,
		backColor: back,
	});

	if (accountType === accountTypes.teacher)
		return style(colors.teacher, colors.teacherLight);
	if (accountType === accountTypes.consultant)
		return style(colors.consultant, colors.consultantLight);
	if (accountType === accountTypes.student)
		return style(colors.student, colors.studentLight);

	return style();
}

// TODO: When a user publishes a comment as another type of user
function Comment({
	author: {
		id,
		type,
		profile: { fullName, picUri },
	},
	text,
	datePublished,
	onPressLike,
	onPressReply,
	onPressProfilePic,
	replies = [],
}) {
	const [showReplies, setShowReplies] = useState(false);
	const styleFromAccountType = getStyleFromAccountType(type);

	return (
		<>
			<View style={styles.container}>
				<Pressable style={styles.picContainer} onPress={onPressProfilePic}>
					<Image style={styles.pic} source={{ uri: picUri }} />
				</Pressable>

				<View style={styles.mainContainer}>
					<View style={styles.authorInfoContainer}>
						<NettText style={styles.authorName} numberOfLines={1}>
							{fullName}
						</NettText>
						<Badge
							style={styles.badge}
							color={colors.appFront}
							size={10}
							useBorders={false}
						/>
						<NettText
							style={[
								styles.authorAccountType,
								{ color: styleFromAccountType.labelColor },
							]}
							numberOfLines={1}
						>
							{type}
						</NettText>
					</View>

					<NettText
						style={[
							styles.comment,
							{ backgroundColor: styleFromAccountType.backColor },
						]}
					>
						{text}
					</NettText>

					<View style={styles.controlsContainer}>
						<NettText style={styles.distanceFromNow} numberOfLines={1}>
							{formatDistanceToNowStrict(parseISO(datePublished))}
						</NettText>
						<NettText
							style={styles.control}
							numberOfLines={1}
							onPress={onPressLike}
						>
							{"Like"}
						</NettText>
						<NettText
							style={styles.control}
							numberOfLines={1}
							onPress={() => onPressReply(id)}
						>
							{"Reply"}
						</NettText>
						{replies && replies.length > 0 && (
							<NettText
								style={styles.control}
								numberOfLines={1}
								onPress={() => setShowReplies(!showReplies)}
							>
								{showReplies
									? "Hide replies"
									: replies.length === 1
									? `Show 1 reply`
									: `Show ${replies.length} replies`}
							</NettText>
						)}
					</View>
				</View>
			</View>
			{replies && replies.length > 0 && showReplies && (
				<FlatList
					style={{ flex: 1, marginStart: 25 }}
					data={replies}
					showsHorizontalScrollIndicator={false}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<Comment
							author={item.author}
							datePublished={item.datePublished}
							text={item.text}
							replies={item.replies}
							onPressLike={() => alert("Like")}
							onPressProfilePic={() => alert("Profile pic")}
							onPressReply={(authorId) => onPressReply(authorId)}
						/>
					)}
				/>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "flex-start",
		flex: 1,
		margin: 7,
	},
	picContainer: {
		marginEnd: 14,
	},
	pic: {
		height: 30,
		width: 30,
		borderRadius: 15,
		backgroundColor: colors.light,
	},
	mainContainer: {
		flex: 1,
	},
	authorInfoContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 7,
		flex: 1,
	},
	authorName: {
		fontSize: 12,
		fontWeight: "bold",
	},
	authorAccountType: {
		fontSize: 12,
		fontWeight: "bold",
		flex: 1,
		textTransform: "capitalize",
	},
	badge: {
		marginHorizontal: 5,
	},
	comment: {
		alignSelf: "flex-start",
		borderRadius: 14,
		fontSize: 14,
		paddingVertical: 10,
		paddingHorizontal: 15,
		marginBottom: 8,
	},
	controlsContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	distanceFromNow: {
		color: "#a3b4c3",
		fontSize: 12,
		fontWeight: "700",
	},
	control: {
		color: "#687988",
		marginStart: 8,
		fontSize: 12,
		fontWeight: "700",
	},
});

export default Comment;
