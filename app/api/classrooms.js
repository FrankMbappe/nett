import client from "./client";
import { lookup } from "react-native-mime-types";
import { basename } from "path";

const endpoint = "/classrooms";

// Getting all classrooms
const getClassrooms = () => client.get(endpoint);

// Getting a specific classroom by its ID
const getClassroom = (classroomId) => client.get(`${endpoint}/${classroomId}`);

// Adding a post to a classroom
const addPost = ({ classroomId, file, text }, onUploadProgress) => {
	const data = new FormData();
	data.append("_type", "normal"); // Post types (Tutorial, Quiz, Normal)
	if (text && text.length > 0) data.append("text", text);
	if (file) {
		const mimetype = lookup(file.uri);

		if (mimetype)
			data.append("_file", {
				name: basename(file.uri),
				type: mimetype,
				uri: file.uri,
			});
	}

	return client.post(`${endpoint}/${classroomId}/posts`, data, {
		onUploadProgress: (progress) =>
			onUploadProgress(progress.loaded / progress.total),
	});
};

// Adding a comment to a post in a classroom
const addComment = ({ classroomId, postId, text }) => {
	const data = { text };
	return client.post(
		`${endpoint}/${classroomId}/posts/${postId}/comments`,
		data
	);
};

// Adding a quiz to a classroom
const addQuiz = ({
	classroomId,
	title,
	description,
	dateOpening,
	dateClosing,
	hasTimeInterval,
	qas,
	isDetermistic,
}) => {
	const data = {
		_type: "quiz",
		title,
		description: description ?? undefined,
		qas,
		hasTimeInterval,
		dateOpening: dateOpening ?? undefined,
		dateClosing: dateClosing ?? undefined,
		isDetermistic,
	};

	return client.post(`${endpoint}/${classroomId}/quizzes`, data);
};

// Adding a Tutorial to a classroom
const addTutorial = (
	{ classroomId, title, description, steps },
	onUploadProgress
) => {
	const data = new FormData();

	data.append("_type", "tutorial");
	data.append("title", title);
	steps.forEach((step) => {
		data.append("steps", {
			position: step.position,
			title: step.title,
			description: step.description ?? undefined,
			video: {
				name: basename(step.video.uri),
				type: lookup(step.video.uri),
				uri: step.video.uri,
			},
		});
	});
	if (description) data.append("description", description);

	return client.post(`${endpoint}/${classroomId}/tutorials`, data, {
		onUploadProgress: (progress) =>
			onUploadProgress(progress.loaded / progress.total),
	});
};

export default {
	getClassrooms,
	getClassroom,
	addPost,
	addComment,
	addQuiz,
	addTutorial,
};
