import client from "./client";

const endpoint = "/classrooms";

const getClassrooms = () => client.get(endpoint);
const getClassroom = (classroomId) => client.get(`${endpoint}/${classroomId}`);

export default {
	getClassrooms,
	getClassroom,
};
