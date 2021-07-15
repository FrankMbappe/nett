import React, { useMemo } from "react";
import { FlatList } from "react-native";
import { ClassroomCard, EventCard } from "../../components/cards";
import { orderBy } from "lodash-es";
import { isPast } from "date-fns";
import SectionHeader from "../../components/SectionHeader";
import { navigators, screens } from "../../navigation/routes";
import { getClassroomInfo } from "../../utils";

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

function getSections(classrooms) {
	// Data
	const posts = useMemo(() => getPosts(classrooms), [classrooms]);
	const events = useMemo(() => getEvents(classrooms), [classrooms]);

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

	// Returns
	return filterSections(sections);
}

export default getSections;
