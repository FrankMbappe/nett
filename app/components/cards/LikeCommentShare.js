import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../config/colors";
import ButtonIcon from "../ButtonIcon";

// TODO: Number format: 2,580 -> 2.6k

function LikeCommentShare({
	isLiked = false,
	likeCount = 0,
	commentCount = 0,
	onPressLike,
	onPressComment,
	onPressShare,
}) {
	return (
		<View style={styles.container}>
			<ButtonIcon
				name="heart"
				color={isLiked ? colors.danger : colors.mediumLight}
				containerStyle={styles.button}
				text={String(likeCount)}
				onPress={onPressLike}
			/>
			<ButtonIcon
				name="forum"
				color={colors.medium}
				containerStyle={styles.button}
				text={String(commentCount)}
				onPress={onPressComment}
			/>
			<ButtonIcon
				name="share-variant"
				color={colors.medium}
				containerStyle={styles.button}
				onPress={onPressShare}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		marginTop: 10,
		borderTopWidth: 1,
		borderTopColor: colors.light,
	},
	button: {
		flex: 1,
		padding: 15,
	},
});

export default LikeCommentShare;
