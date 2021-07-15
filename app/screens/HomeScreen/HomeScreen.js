import React, { useEffect, useState } from "react";
import { FlatList, SectionList, View } from "react-native";
import classroomsApi from "../../api/classrooms";
import useApi from "../../hooks/useApi";
import useAuth from "../../hooks/useAuth";

import { PostCard, ClassroomCard, EventCard } from "../../components/cards";
import ActivityIndicator from "../../components/ActivityIndicator";
import ApiError from "../../components/ApiError";
import HomeScreenHeader from "./HomeScreenHeader";
import Screen from "../../components/Screen";
import SectionHeader from "../../components/SectionHeader";

import {
	handlePublishComment,
	handleShare,
} from "../ClassroomScreen/ClassroomScreen";
import { navigators, screens } from "../../navigation/routes";
import { getClassroomInfo, userFullName } from "../../utils";
import { getPosts, getEvents, filterSections } from "./homeScreenUtils";
import styles from "./styles";

function HomeScreen({ navigation }) {
	// Context
	const { currentUser } = useAuth();

	// API
	const {
		data: classrooms,
		error,
		isLoading,
		request: loadClassrooms,
	} = useApi(classroomsApi.getClassrooms);
	// Data
	const posts = getPosts(classrooms);
	const events = getEvents(classrooms);

	// States
	const [isInitScrollPosition, setIsInitScrollPosition] = useState(true);
	const [refreshing, setRefreshing] = useState(false);

	// Effects
	useEffect(() => {
		loadClassrooms();
	}, []);

	// Sections
	const sections = [
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
	];

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
											currentUserId={currentUser._id}
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
