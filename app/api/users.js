import client from "./client";
import { basename } from "path";

const endpoint = "/users";

const setProfile = ({ picUri, firstName, lastName, email, birthDate }) => {
	const data = new FormData();
	data.append("firstName", firstName);
	data.append("lastName", lastName);
	data.append("email", email);
	data.append("birthDate", birthDate);

	if (picUri)
		data.append("picUri", {
			name: basename(picUri),
			type: "image/jpeg",
			uri: picUri,
		});

	return client.post(`${endpoint}/me/profile`, data);
};

export default {
	setProfile,
};
