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

export default {
	getClassrooms,
	getClassroom,
	addPost,
};
