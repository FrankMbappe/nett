import client from "./client";

const endpoint = "/classrooms";

const getClassrooms = () => client.get(endpoint);
const getClassroom = () => {};

export default {
	getClassrooms,
	getClassroom,
};
