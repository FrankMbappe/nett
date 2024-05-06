import React from "react";
import { View, StyleSheet } from "react-native";

import ButtonIcon from "../ButtonIcon";
import { numberFormat } from "../../utils";
import colors from "../../config/colors";

function LikeCommentShare({
	onPressLike,
	onPressComment,
	onPressShare,
	isLiked = false,
	likeCount = 0,
	commentCount = 0,
}) {
	return (
		<View style={styles.container}>
			<ButtonIcon
				name="heart"
				color={isLiked ? colors.danger : colors.mediumLight}
				containerStyle={styles.button}
				text={numberFormat(likeCount)}
				onPress={onPressLike}
			/>
			<ButtonIcon
				name="forum"
				color={colors.medium}
				containerStyle={styles.button}
				text={numberFormat(commentCount)}
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
		marginTop: 5,
	},
	button: {
		flex: 1,
		padding: 15,
	},
});

export default LikeCommentShare;
