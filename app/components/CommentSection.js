import React, { useState } from "react";
import {
	FlatList,
	StyleSheet,
	Modal,
	View,
	KeyboardAvoidingView,
} from "react-native";

import ButtonIcon from "./ButtonIcon";
import Comment from "./Comment";
import NettText from "./Text";
import NettTextInput from "./TextInput";
import Screen from "./Screen";
import TopBar from "./TopBar";
import colors from "../config/colors";
import { userFullName } from "../utils";

function CommentSection({
	isVisible,
	onPressBack,
	onPressLike,
	onPublish,
	comments = [],
	isLiked = false,
	title = "👩‍👩‍👧‍👦  Comments",
}) {
	// States
	const [text, setText] = useState("");
	const [commentInputFocus, setCommentInputFocus] = useState(false);
	const [refreshing, setRefreshing] = useState(false);

	// Action handlers
	const onPressMentioner = () => alert("Mentioner");

	return (
		<Modal
			visible={isVisible}
			style={styles.modal}
			animationType="slide"
			statusBarTranslucent
			onRequestClose={onPressBack}
		>
			<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
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
						keyExtractor={(item) => item._id}
						renderItem={({ item: { author, creationDate, text } }) => (
							<Comment
								author={{
									...author,
									profile: {
										...author.profile,
										fullName: userFullName({ ...author.profile }),
										picUri: author.profile.picUri,
									},
								}}
								creationDate={creationDate}
								text={text}
								onPressLike={() => alert("Like")}
								onPressProfilePic={() => alert("Profile pic")}
								onPressReply={(authorId) => {
									setText((prevValue) => prevValue.concat("@", authorId));
									setCommentInputFocus(true);
								}}
							/>
						)}
						refreshing={refreshing}
					/>
					<View style={styles.bottomBar}>
						<ButtonIcon
							containerStyle={styles.mentionButton}
							name="at"
							color={colors.medium}
							size={25}
							onPress={onPressMentioner}
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
							onPress={() => {
								onPublish(text);
								setText("");
							}}
						/>
					</View>
				</Screen>
			</KeyboardAvoidingView>
		</Modal>
	);
}

const styles = StyleSheet.create({
	screen: {},
	bottomBar: {
		backgroundColor: colors.appBack,
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 5,
		paddingTop: 10,
		paddingBottom: 0,
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
