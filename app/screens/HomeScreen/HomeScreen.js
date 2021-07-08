import React, { useEffect, useMemo, useState } from "react";
import { FlatList, SectionList } from "react-native";
import { compareDesc } from "date-fns";

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

// --- Sorting & Filtering lists --- //
function filterSections(sections) {
	// Filter: Only sections containing at least 1 item
	return sections.filter((section) =>
		section ? section.data.length > 0 : false
	);
}
function getEvents(classrooms) {
	// TODO
	// Filter: Only events that did not end up yet
	// Sort: Soonest ending first
	// return array
	// 	.filter((x) => new Date(x.dateClosing) > new Date())
	// 	.sort((x, y) =>
	// 		compareAsc(new Date(x.dateClosing), new Date(y.dateClosing))
	// 	);
	return [];
}
function getPosts(classrooms) {
	if (!classrooms) return [];

	// Extracting post list
	const posts = classrooms.flatMap((classroom) => classroom.posts);

	// Sort: Most recent post first
	return posts;
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
	useEffect(() => {
		setPostList(getPosts(classrooms));
		setEventList(getEvents(classrooms));
	}, [classrooms]);

	// States
	const [postList, setPostList] = useState(getPosts(classrooms));
	const [eventList, setEventList] = useState(getEvents(classrooms)); // TODO: Get upcoming quizzes

	// Other variables
	const [isInitScrollPosition, setIsInitScrollPosition] = useState(true);
	const [refreshing, setRefreshing] = useState(false);

	// Sections
	const sections = useMemo(
		() => [
			/* EVENTS */
			eventList.length && {
				Title: (
					<SectionHeader
						expand
						icon="clock-outline"
						title="Scheduled events"
						onExpansion={() =>
							navigation.navigate(screens.ShowAllEvents, {
								data: eventList,
							})
						}
					/>
				),
				data: [
					<FlatList
						style={{ flexGrow: 0 }}
						data={eventList}
						showsHorizontalScrollIndicator={false}
						keyExtractor={(item) => item.id}
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
						icon="google-classroom"
						title="Classrooms"
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
								onPress={() =>
									navigation.navigate(navigators.Classroom, {
										classroomId: _id,
									})
								}
							/>
						)}
						horizontal
					/>,
				],
			},

			/* POSTS */
			postList && {
				Title: <SectionHeader title="Recent updates" />,
				data: postList,
			},
		],
		[classrooms]
	);

	return (
		<Screen style={styles.screen}>
			{/* When an error occurs */}
			{error && !isLoading && <ApiError onPressRetry={loadClassrooms} />}

			{/* Screen body */}
			{!error && (
				<>
					{/* --> Header */}
					<HomeScreenHeader isAtInitScrollPosition={isInitScrollPosition} />

					{/* --> Main content */}
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
							else
								return (
									<PostCard
										currentUserId={currentUser.id}
										post={{
											...post,
											author: {
												fullName: userFullName({ ...post.author.profile }),
												picUri: post.author.profile.picUri,
											},
											classroom: post.classroom
												? classrooms.find(
														(classroom) => classroom._id === post.classroom
												  ).name
												: "Classroom",
										}}
										onLike={() => alert("Call endpoint /like")}
										onPublishComment={(text) =>
											alert("Call endpoint /comment with " + text)
										}
									/>
								);
						}}
						showsVerticalScrollIndicator={false}
					/>
				</>
			)}

			{/* Loader */}
			<ActivityIndicator visible={isLoading} />
		</Screen>
	);
}

export default HomeScreen;
