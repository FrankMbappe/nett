import { formatDistanceToNowStrict, parseISO } from "date-fns";
import React from "react";
import { View, StyleSheet, Image, Pressable } from "react-native";
import colors from "../config/colors";
import { accountTypes } from "../config/enums";
import Badge from "./Badge";
import NettText from "./Text";

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
	const styleFromAccountType = getStyleFromAccountType(type);

	return (
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

				<View style={styles.controls}>
					<NettText style={styles.distanceFromNow} numberOfLines={1}>
						{formatDistanceToNowStrict(parseISO(datePublished))}
					</NettText>
					<NettText style={styles.like} numberOfLines={1} onPress={onPressLike}>
						Like
					</NettText>
					<NettText
						style={styles.replies}
						numberOfLines={1}
						onPress={onPressReply}
					>
						{replies.length ? `Show ${replies.length} replies` : "Reply"}
					</NettText>
				</View>
			</View>
		</View>
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
	controls: {
		flexDirection: "row",
		alignItems: "center",
	},
	distanceFromNow: {
		color: "#a3b4c3",
		marginEnd: 15,
		fontSize: 12,
		fontWeight: "700",
	},
	like: {
		color: "#687988",
		marginEnd: 8,
		fontSize: 12,
		fontWeight: "700",
	},
	replies: {
		color: "#687988",
		fontSize: 12,
		fontWeight: "700",
	},
});

export default Comment;
