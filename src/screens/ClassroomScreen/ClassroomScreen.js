import React, { useEffect, useState } from "react";
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

import ApiError from "../../components/ApiError";
import { orderBy } from "lodash-es";
import Toast from "react-native-root-toast";
import useAuth from "../../hooks/useAuth";
import { postTypes } from "../../config/enums";

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
const handlePressPost = (classroomName, post, navigation) => {
	if (!post || !navigation) return;

	if (post._type === postTypes.normal)
		return navigation.navigate(screens.Classroom); // TODO: Post preview
	if (post._type === postTypes.quiz)
		return navigation.navigate(screens.QuizPreview, {
			classroomName,
			quiz: post,
		});
	if (post._type === postTypes.tutorial)
		return navigation.navigate(screens.TutorialPreview, {
			classroomName,
			tutorial: post,
		});
};

function ClassroomScreen({ route, navigation }) {
	// Context
	const { currentUser } = useAuth();

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
	const { name, posts, quizzes, tutorials, topics, teacher } = classroom;
	const allPosts = posts &&
		quizzes &&
		tutorials && [...posts, ...quizzes, ...tutorials];
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
	const handleCreatePost = () => {
		navigation.navigate(screens.PostCreation, {
			classroomId,
			classroomName: name,
		});
	};

	return (
		<>
			{/* Loading animation */}
			<ActivityIndicator visible={isLoading} />

			<Screen style={styles.screen} backImage={images.CLASSROOM_BACKGROUND}>
				{/* When an error occurs */}
				<ApiError
					show={error && !isLoading}
					onPressRetry={() => loadClassroom(classroomId)}
				/>

				{/* Screen body */}
				{!error && (
					<>
						{/* Top bar */}
						<TopBar style={styles.topBar}>
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
							<View style={styles.topicFlatListContainer}>
								<FlatList
									contentContainerStyle={styles.topicFlatListContent}
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
								setIsAtInitScrollPosition(
									event.nativeEvent.contentOffset.y === 0
								)
							}
							data={orderBy(allPosts, "creationDate", "desc")}
							keyExtractor={({ _id }) => String(_id)}
							showsVerticalScrollIndicator={false}
							renderItem={({ item: post }) => (
								<PostCard
									currentUserId={currentUser._id}
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
									onPress={() => handlePressPost(name, post, navigation)}
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
			</Screen>
		</>
	);
}

export default ClassroomScreen;
export { handlePublishComment, handleShare };
