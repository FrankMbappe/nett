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

// --- Sorting & Filtering lists --- //
function filterSections(array) {
	// Filter: Only sections containing at least 1 item
	return array.filter((x) => (x ? x.data.length > 0 : false));
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
								name={name}
								nbOfParticipants={
									(participations && participations.length) ?? 0
								}
								teacherProfile={profile}
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
			{error && !isLoading && (
				<>
					<NettText style={{ padding: 15, fontSize: 18 }}>
						Couldn't connect to the server
					</NettText>
					<NettButton text="Retry" onPress={loadCountries} />
				</>
			)}

			{/* Screen body */}
			{!error && (
				<>
					{/* --> Header */}
					<HomeScreenHeader isAtInitScrollPosition={isInitScrollPosition} />

					{/* --> Main content */}
					<SectionList
						keyExtractor={(_, index) => String(index)}
						contentContainerStyle={{ alignItems: "center" }}
						style={{ flex: 1 }}
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
										userId={currentUser.id}
										post={post}
										classroomName={
											classrooms.find((x) => x.id === post.classroom).name
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
