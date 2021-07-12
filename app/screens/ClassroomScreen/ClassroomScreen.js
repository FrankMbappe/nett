import React, { useCallback, useEffect, useState } from "react";
import { View, FlatList, TouchableHighlight, Share } from "react-native";
import useApi from "../../hooks/useApi";
import classroomsApi from "../../api/classrooms";

import { PostCard } from "../../components/cards";
import ActivityIndicator from "../../components/ActivityIndicator";
import ButtonIcon from "../../components/ButtonIcon";
import FloatingButton from "../../components/FloatingButton";
import Icon from "../../components/Icon";
import NettText from "../../components/Text";
import Screen from "../../components/Screen";
import TopBar from "../../components/TopBar";
import { screens } from "../../navigation/routes";
import { formatWordCount, userFullName } from "../../utils";
import colors from "../../config/colors";
import images from "../../config/images";
import styles from "./styles";

import currentUser from "../../config/test";
import ApiError from "../../components/ApiError";
import { orderBy } from "lodash-es";
import Toast from "react-native-root-toast";

// Public action handlers
const handlePublishComment = async (classroomId, postId, text) => {
	// Input validation
	if (text.length < 3)
		return Toast.show("Your comment must be at least 3 characters long", {
			backgroundColor: colors.warning,
		});

	// Attempting to publish comment
	Toast.show("Publishing your comment...");
	const values = { classroomId, postId, text };
	const result = await classroomsApi.addComment(values);

	// Failure
	if (!result || !result.ok)
		return Toast.show(
			"Something went wrong while publishing your comment, please try again",
			{ backgroundColor: colors.danger }
		);

	//
	Toast.show("Your comment has been published", {
		backgroundColor: colors.ok,
	});
};
const handleShare = async (text) => {
	try {
		await Share.share({
			message: text,
		});
	} catch (error) {
		Toast.show(error.message, { backgroundColor: colors.danger });
	}
};

function ClassroomScreen({ route, navigation }) {
	// Getting params
	const { classroomId } = route.params;

	// API
	const {
		data: classroom,
		error,
		isLoading,
		request: loadClassroom,
	} = useApi(classroomsApi.getClassroom);

	// Extracting variables
	const { name, posts, topics, teacher } = classroom;
	const teacherFullName = teacher
		? userFullName({ ...teacher.profile })
		: "User";

	// Effects
	useEffect(() => {
		loadClassroom(classroomId);
	}, []);

	// States
	const [isAtInitScrollPosition, setIsAtInitScrollPosition] = useState(true);
	const [refreshing, setRefreshing] = useState(false);

	// Action handlers
	const handleCreatePost = useCallback(() => {
		navigation.navigate(screens.PostCreation, {
			classroomId,
			classroomName: name,
		});
	}, []);

	return (
		<Screen
			style={styles.screen}
			backImage={images.CLASSROOM_BACKGROUND}
			backImageStyle={{ opacity: isLoading ? 0.25 : 1 }}
		>
			{/* When an error occurs */}
			<ApiError
				show={error && !isLoading}
				onPressRetry={() => loadClassroom(classroomId)}
			/>

			{/* Screen body */}
			{!error && (
				<>
					{/* Top bar */}
					<TopBar style={[styles.topBar, { opacity: isLoading ? 0.25 : 1 }]}>
						<ButtonIcon
							name="arrow-left"
							size={25}
							onPress={() => navigation.goBack()}
						/>
						<Icon
							name="school"
							iconColor={colors.ok}
							backgroundColor={colors.okLight}
							style={styles.classroomPic}
						/>
						<View style={styles.topBarTitleContainer}>
							<NettText style={styles.topBarTitle} numberOfLines={1}>
								{name}
							</NettText>
							<NettText style={styles.topBarCaption} numberOfLines={1}>
								{`Held by ${teacherFullName}`}
							</NettText>
						</View>
						<ButtonIcon name="magnify" />
						<ButtonIcon name="dots-vertical" />
					</TopBar>
					{topics != null && topics.length > 0 && (
						<View
							style={[
								styles.topicFlatListContainer,
								{ opacity: isLoading ? 0.25 : 1 },
							]}
						>
							<FlatList
								contentContainerStyle={[styles.topicFlatListContent]}
								style={[
									styles.topicFlatList,
									!isAtInitScrollPosition && {
										borderBottomColor: colors.light,
									},
								]}
								data={topics}
								keyExtractor={({ _id }) => String(_id)}
								renderItem={({ item: { name } }) => (
									<NettText style={styles.topic}>{name}</NettText>
								)}
								horizontal
								showsHorizontalScrollIndicator={false}
							/>
						</View>
					)}

					{/* Post list */}
					<FlatList
						contentContainerStyle={styles.postFlatListContent}
						onScroll={(event) =>
							setIsAtInitScrollPosition(event.nativeEvent.contentOffset.y === 0)
						}
						data={orderBy(posts, "creationDate", "desc")}
						style={{ opacity: isLoading ? 0.25 : 1 }}
						keyExtractor={({ _id }) => String(_id)}
						showsVerticalScrollIndicator={false}
						renderItem={({ item: post }) => (
							<PostCard
								currentUserId={currentUser.id}
								post={{
									...post,
									author: {
										fullName: userFullName({ ...post.author.profile }),
										picUri: post.author.profile.picUri,
									},
								}}
								onLike={() => alert("Call endpoint /like")}
								onPublishComment={(text) =>
									handlePublishComment(classroomId, post._id, text)
								}
								onShare={() => handleShare(post.text)}
							/>
						)}
						refreshing={refreshing}
						onRefresh={() => loadClassroom(classroomId)}
					/>

					{/* Add post button */}
					<FloatingButton
						icon="pencil"
						onPress={handleCreatePost}
						style={styles.createPostButton}
					/>

					{/* Footer */}
					<TouchableHighlight style={styles.footer}>
						<NettText style={styles.footerText}>{`${formatWordCount(
							1,
							"online participant"
						)}`}</NettText>
					</TouchableHighlight>
				</>
			)}

			{/* Loading animation */}
			<ActivityIndicator visible={isLoading} />
		</Screen>
	);
}

export default ClassroomScreen;
export { handlePublishComment, handleShare };
