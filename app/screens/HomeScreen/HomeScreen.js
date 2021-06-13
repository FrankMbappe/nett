import React, { useMemo, useState } from "react";
import { FlatList, SectionList } from "react-native";
import { compareAsc, compareDesc } from "date-fns";

import { ClassroomCard, EventCard, PostCard } from "../../components/cards";
import SectionHeader from "../../components/SectionHeader";
import Screen from "../../components/Screen";

import { classrooms, posts, events } from "../../config/dummyData";

import styles from "./styles";
import HomeScreenHeader from "./HomeScreenHeader";
import { screens } from "../../config/navigators";

// --- Sorting & Filtering lists --- //
function filterSections(array) {
	// Filter: Only sections containing at least 1 item
	return array.filter((x) => (x ? x.data.length > 0 : false));
}
function sortEvents(array = events) {
	// Filter: Only events that did not end up yet
	// Sort: Soonest ending first
	return array
		.filter((x) => new Date(x.dateClosing) > new Date())
		.sort((x, y) =>
			compareAsc(new Date(x.dateClosing), new Date(y.dateClosing))
		);
}
function sortPosts(array = posts) {
	// Sort: Most recent post first
	return array.sort((x, y) =>
		compareDesc(new Date(x.createdOn), new Date(y.createdOn))
	);
}

function HomeScreen({ navigation }) {
	// Lists
	const [classroomList, setClassroomList] = useState(classrooms);
	const [postList, setPostList] = useState(sortPosts);
	const [eventList, setEventList] = useState(sortEvents);

	// Other variables
	const [isInitScrollPosition, setIsInitScrollPosition] = useState(true);
	const [refreshing, setRefreshing] = useState(false);

	// Sections
	const sections = useMemo(
		() => [
			/* "xxList.length && { Object }": The section will be rendered only when
		   its number of children will be greater than zero. */
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
							<EventCard event={item} onPress={() => alert("Event")} />
						)}
						horizontal
					/>,
				],
			},
			classroomList.length && {
				Title: (
					<SectionHeader
						expand
						icon="google-classroom"
						title="Classrooms"
						onExpansion={() =>
							navigation.navigate(screens.ShowAllClassrooms, {
								data: classroomList,
							})
						}
					/>
				),
				data: [
					classroomList.length && (
						<FlatList
							style={{ flexGrow: 0 }}
							data={classroomList}
							showsHorizontalScrollIndicator={false}
							keyExtractor={(item) => item.id}
							renderItem={({ item }) => <ClassroomCard classroom={item} />}
							horizontal
						/>
					),
				],
			},
			postList && {
				Title: <SectionHeader title="Recent updates" />,
				data: postList,
			},
		],
		[classroomList, postList, eventList]
	);

	return (
		<Screen style={styles.screen}>
			{/* --> Header */}
			<HomeScreenHeader isAtInitScrollPosition={isInitScrollPosition} />

			{/* --> Main content */}
			<SectionList
				keyExtractor={(_, index) => String(index)}
				contentContainerStyle={{ alignItems: "center" }}
				style={{ flex: 1 }}
				sections={filterSections(sections)}
				onRefresh={() => {
					setEventList(sortEvents);
					setClassroomList(classrooms);
					setPostList(sortPosts);
				}}
				onScroll={(event) =>
					setIsInitScrollPosition(event.nativeEvent.contentOffset.y === 0)
				}
				refreshing={refreshing}
				renderSectionHeader={({ section: { Title } }) => Title}
				renderItem={({ item }) => {
					if (!item) return null;
					if (React.isValidElement(item)) return item;
					else
						return (
							<PostCard
								userId="usr-100"
								post={item}
								classroomName={
									classrooms.find((x) => x.id === item.classroom).name
								}
							/>
						);
				}}
				showsVerticalScrollIndicator={false}
			/>

			{/* // TODO: Bottom bar */}
		</Screen>
	);
}

export default HomeScreen;
