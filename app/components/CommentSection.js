import React from "react";
import { FlatList, StyleSheet, Modal } from "react-native";
import colors from "../config/colors";
import ButtonIcon from "./ButtonIcon";
import Comment from "./Comment";
import Screen from "./Screen";
import NettText from "./Text";
import TopBar from "./TopBar";

function CommentSection({
	isVisible,
	onPressBack,
	onPressLike,
	isLiked = false,
	title = "Comments",
	comments = [],
}) {
	return (
		<Modal visible={isVisible} style={styles.modal} animationType="slide">
			<Screen style={styles.screen}>
				<TopBar style={styles.topBar}>
					<ButtonIcon name="arrow-left" size={25} onPress={onPressBack} />
					<NettText style={styles.title}>{title}</NettText>
					<ButtonIcon
						color={isLiked ? colors.danger : colors.mediumLight}
						name="heart"
						size={25}
						onPress={onPressLike}
					/>
				</TopBar>
				<FlatList
					style={{ flex: 1 }}
					data={comments}
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
							onPressReply={() => alert("Reply")}
						/>
					)}
				/>
			</Screen>
		</Modal>
	);
}

const styles = StyleSheet.create({
	screen: {},
	topBar: {
		marginBottom: 5,
	},
	title: {
		fontWeight: "bold",
		flex: 1,
		textAlign: "center",
		fontSize: 16,
	},
});

export default CommentSection;
