import React, { useCallback, useState } from "react";
import { FlatList, StyleSheet, Modal, View } from "react-native";
import colors from "../config/colors";
import ButtonIcon from "./ButtonIcon";
import Comment from "./Comment";
import Screen from "./Screen";
import NettText from "./Text";
import NettTextInput from "./TextInput";
import TopBar from "./TopBar";

function CommentSection({
	isVisible,
	onPressBack,
	onPressLike,
	onPublish,
	comments = [],
	isLiked = false,
	title = "Comments",
}) {
	const [text, setText] = useState("");
	const [image, setImage] = useState();
	const [commentInputFocus, setCommentInputFocus] = useState(false);
	const getImage = () => alert("Get image");
	const showMentioner = () => alert("Mentioner");

	return (
		<Modal
			visible={isVisible}
			style={styles.modal}
			animationType="fade"
			statusBarTranslucent
			onRequestClose={onPressBack}
		>
			<Screen style={styles.screen}>
				<TopBar style={styles.topBar}>
					<ButtonIcon name="arrow-left" size={25} onPress={onPressBack} />
					<NettText style={styles.title} numberOfLines={1}>
						{title}
					</NettText>
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
							onPressReply={(authorId) => {
								setText((prevValue) => prevValue.concat("@", authorId));
								setCommentInputFocus(true);
							}}
						/>
					)}
				/>
				<View style={styles.bottomBar}>
					<ButtonIcon
						containerStyle={styles.imageButton}
						name="image-area"
						color={colors.medium}
						size={25}
						onPress={getImage}
					/>
					<ButtonIcon
						containerStyle={styles.mentionButton}
						name="at"
						color={colors.medium}
						size={25}
						onPress={showMentioner}
					/>
					<NettTextInput
						autoFocus={true}
						containerStyle={styles.input}
						fontSize={15}
						focus={commentInputFocus}
						multiline
						onChangeText={(text) => setText(text)}
						placeholder="Write a comment"
						value={text}
					/>
					<ButtonIcon
						containerStyle={styles.sendButton}
						color={colors.appBack}
						name="send"
						size={25}
						onPress={onPublish(text, image)} // TODO: onPublish(_, image)
					/>
				</View>
			</Screen>
		</Modal>
	);
}

const styles = StyleSheet.create({
	screen: {},
	bottomBar: {
		backgroundColor: colors.appBack,
		flexDirection: "row",
		alignItems: "center",
		padding: 5,
	},
	input: {
		flex: 1,
		marginHorizontal: 5,
		maxHeight: 75,
	},
	topBar: {
		marginBottom: 5,
	},
	title: {
		fontWeight: "bold",
		flex: 1,
		textAlign: "center",
		fontSize: 16,
	},
	sendButton: {
		backgroundColor: colors.appPrimary,
		padding: 10,
		borderRadius: 25,
		marginStart: 5,
	},
});

export default CommentSection;
