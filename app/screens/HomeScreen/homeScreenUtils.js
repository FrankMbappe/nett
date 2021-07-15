import React from "react";
import { orderBy } from "lodash-es";
import { isPast } from "date-fns";
import { getClassroomInfo } from "../../utils";

const filterSections = (sections) => {
	// Filter: Only sections containing at least 1 item
	return sections.filter((section) =>
		section.data ? section.data.length > 0 : false
	);
};

const getEvents = (classrooms) => {
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
};

const getPosts = (classrooms) => {
	if (!classrooms) return [];

	// Extracting post list
	const posts = classrooms.flatMap(({ posts, quizzes, tutorials }) => [
		...posts,
		...quizzes,
		...tutorials,
	]);

	// Sort: Most recent post first
	return orderBy(posts, "creationDate", "desc");
};

export { getPosts, getEvents, filterSections };
