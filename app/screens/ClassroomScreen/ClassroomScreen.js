import React, { useEffect, useState } from "react";
import { View, FlatList, TouchableHighlight } from "react-native";
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
import { userFullName } from "../../utils";
import colors from "../../config/colors";
import images from "../../config/images";
import styles from "./styles";

import currentUser from "../../config/test";
import NettButton from "../../components/Button";
import ApiError from "../../components/ApiError";

function ClassroomScreen({ route, navigation }) {
	// Getting params
	const { classroomId } = route.params;

	// API calls
	const {
		data: classroom,
		error,
		isLoading,
		request: loadClassroom,
	} = useApi(classroomsApi.getClassroom);
	useEffect(() => {
		loadClassroom(classroomId);
	}, []);

	// States
	const [isAtInitScrollPosition, setIsAtInitScrollPosition] = useState(true);
	const [refreshing, setRefreshing] = useState(false);

	// Extracted variables
	const { name, posts, topics, teacher } = classroom;
	const teacherFullName = teacher
		? userFullName({ ...teacher.profile })
		: "User";

	return (
		<Screen style={styles.screen} backImage={images.CLASSROOM_BACKGROUND}>
			{/* When an error occurs */}
			{error && !isLoading && (
				<ApiError onPressRetry={() => loadClassroom(classroomId)} />
			)}

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
								contentContainerStyle={[styles.topicFlatListContent]}
								style={[
									styles.topicFlatList,
									!isAtInitScrollPosition && {
										borderBottomColor: colors.light,
									},
								]}
								data={topics}
								keyExtractor={({ id }) => String(id)}
								renderItem={({ item: { title } }) => (
									<NettText style={styles.topic}>{title}</NettText>
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
						data={posts}
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
									alert("Call endpoint /comment with " + text)
								}
							/>
						)}
						refreshing={refreshing}
						onRefresh={() => loadClassroom(classroomId)}
					/>

					{/* Add post button */}
					<FloatingButton
						icon="pencil"
						onPress={() =>
							navigation.navigate(screens.PostCreation, {
								classroomName: name,
							})
						}
						style={styles.createPostButton}
					/>

					{/* Footer */}
					<TouchableHighlight style={styles.footer}>
						<NettText
							style={styles.footerText}
						>{`1 online participant(s)`}</NettText>
					</TouchableHighlight>
				</>
			)}

			{/* Loading animation */}
			<ActivityIndicator visible={isLoading} />
		</Screen>
	);
}

export default ClassroomScreen;
