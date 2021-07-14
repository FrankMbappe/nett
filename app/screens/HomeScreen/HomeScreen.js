import React, { useEffect, useMemo, useState } from "react";
import { FlatList, SectionList, View } from "react-native";
import { isPast } from "date-fns";

import useApi from "../../hooks/useApi";
import classroomsApi from "../../api/classrooms";
import { ClassroomCard, EventCard, PostCard } from "../../components/cards";
import ActivityIndicator from "../../components/ActivityIndicator";
import HomeScreenHeader from "./HomeScreenHeader";
import Screen from "../../components/Screen";
import SectionHeader from "../../components/SectionHeader";
import { navigators, screens } from "../../navigation/routes";
import styles from "./styles";
import currentUser from "../../config/test";
import { userFullName } from "../../utils";
import ApiError from "../../components/ApiError";
import { includes, orderBy } from "lodash-es";
import {
	handlePublishComment,
	handleShare,
} from "../ClassroomScreen/ClassroomScreen";

// Helper functions
function filterSections(sections) {
	// Filter: Only sections containing at least 1 item
	return sections.filter((section) =>
		section.data ? section.data.length > 0 : false
	);
}
function getEvents(classrooms) {
	if (!classrooms) return [];

	// Extracting events (just quizzes for instance)
	const events = classrooms
		.flatMap(({ quizzes }) => quizzes) // All quizzes of all classrooms
		.filter((quiz) => !isPast(new Date(quiz.dateClosing))) // Only those that are active
		.map((quiz) => ({
			id: quiz._id,
			classroom: getClassroomInfo(classrooms, quiz).name,
			type: quiz._type,
			name: quiz.title,
			dateClosing: quiz.dateClosing,
			dateOpening: quiz.dateOpening,
		}));
	if (!events) return [];

	return orderBy(events, "dateClosing", "desc");
}
function getPosts(classrooms) {
	if (!classrooms) return [];

	// Extracting post list
	const posts = classrooms.flatMap(({ posts, quizzes, tutorials }) => [
		...posts,
		...quizzes,
		...tutorials,
	]);

	// Sort: Most recent post first
	return orderBy(posts, "creationDate", "desc");
}
function getClassroomInfo(classrooms, post) {
	return classrooms.find(({ posts, quizzes, tutorials }) =>
		includes([...posts, ...quizzes, ...tutorials], post)
	);
}

function HomeScreen({ navigation }) {
	// API
	const {
		data: classrooms,
		error,
		isLoading,
		request: loadClassrooms,
	} = useApi(classroomsApi.getClassrooms);

	// Getting data from API
	useEffect(() => {
		loadClassrooms();
	}, []);

	// Data
	const posts = useMemo(() => getPosts(classrooms), [classrooms]);
	const events = useMemo(() => getEvents(classrooms), [classrooms]);

	// States
	const [isInitScrollPosition, setIsInitScrollPosition] = useState(true);
	const [refreshing, setRefreshing] = useState(false);

	// Sections
	const sections = useMemo(
		() => [
			/* EVENTS */
			events.length && {
				Title: (
					<SectionHeader
						expand
						title="⏳  Scheduled events"
						onExpansion={() =>
							navigation.navigate(screens.ShowAllEvents, {
								data: getEvents(classrooms),
							})
						}
					/>
				),
				data: [
					<FlatList
						style={{ flexGrow: 0 }}
						data={getEvents(classrooms)}
						showsHorizontalScrollIndicator={false}
						keyExtractor={({ id }) => String(id)}
						renderItem={({ item }) => (
							<EventCard event={item} onPress={() => alert("Event")} /> // TODO: OnPress Event
						)}
						horizontal
					/>,
				],
			},

			/* CLASSROOMS */
			classrooms.length && {
				Title: (
					<SectionHeader
						expand
						title="🏫  Classrooms"
						onExpansion={() =>
							navigation.navigate(screens.ShowAllClassrooms, {
								data: classrooms,
							})
						}
					/>
				),
				data: [
					<FlatList
						style={{ flexGrow: 0 }}
						data={classrooms}
						showsHorizontalScrollIndicator={false}
						keyExtractor={({ _id }) => String(_id)}
						renderItem={({
							item: {
								_id,
								name,
								participations,
								teacher: { profile },
							},
						}) => (
							<ClassroomCard
								classroom={{
									name,
									nbOfParticipants: participations.length + 1,
								}}
								teacher={{ fullName: userFullName({ ...profile }), ...profile }}
								onPress={() => {
									navigation.navigate(navigators.Classroom, {
										screen: screens.Classroom,
										params: { classroomId: _id },
									});
								}}
							/>
						)}
						horizontal
					/>,
				],
			},

			/* POSTS */
			posts.length && {
				Title: <SectionHeader title="🌍  Recent updates" />,
				data: getPosts(classrooms),
			},
		],
		[classrooms]
	);

	return (
		<Screen style={styles.screen}>
			{/* When an error occurs */}
			<ApiError show={error && !isLoading} onPressRetry={loadClassrooms} />

			{/* Screen body */}
			{!error && (
				<>
					{/* --> Header */}
					<HomeScreenHeader isAtInitScrollPosition={isInitScrollPosition} />

					{/* --> Main content */}
					<View style={styles.mainContainer}>
						<SectionList
							keyExtractor={(_, index) => String(index)}
							contentContainerStyle={{ alignItems: "center" }}
							style={{ flex: 1, opacity: error || isLoading ? 0 : 1 }}
							sections={filterSections(sections)}
							onRefresh={loadClassrooms}
							onScroll={(event) =>
								setIsInitScrollPosition(event.nativeEvent.contentOffset.y === 0)
							}
							refreshing={refreshing}
							renderSectionHeader={({ section: { Title } }) => Title}
							renderItem={({ item: post }) => {
								if (!post) return null;
								if (React.isValidElement(post)) return post;
								else {
									// Getting classroom info
									const classroom = getClassroomInfo(classrooms, post);
									return classroom ? (
										<PostCard
											currentUserId={currentUser.id}
											post={{
												...post,
												author: {
													fullName: userFullName({ ...post.author.profile }),
													picUri: post.author.profile.picUri,
												},
												classroom: classroom.name,
											}}
											onLike={() => alert("Call endpoint /like")}
											onPublishComment={(text) =>
												handlePublishComment(classroom._id, post._id, text)
											}
											onShare={() => handleShare(post.text)}
										/>
									) : null;
								}
							}}
							showsVerticalScrollIndicator={false}
						/>
					</View>
				</>
			)}

			{/* Loader */}
			<ActivityIndicator visible={isLoading} />
		</Screen>
	);
}

export default HomeScreen;
