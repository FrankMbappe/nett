import apiClient from "./client";
import { basename } from "path";
import { lookup } from "react-native-mime-types";

const endpoint = "/users";

const setProfile = (
	{ picUri, firstName, lastName, email, birthDate },
	onUploadProgress
) => {
	const data = new FormData();
	data.append("firstName", firstName);
	data.append("lastName", lastName);
	data.append("email", email);
	data.append("birthDate", birthDate);

	if (picUri) {
		const mimetype = lookup(picUri);

		if (mimetype)
			data.append("picUri", {
				name: basename(picUri),
				type: mimetype,
				uri: picUri,
			});
	}

	return apiClient.post(`${endpoint}/me/profile`, data, {
		onUploadProgress: (progress) =>
			onUploadProgress(progress.loaded / progress.total),
	});
};

const setType = (_type) => {
	const data = { _type };
	return apiClient.put(endpoint + "/type", data);
};

export default {
	setProfile,
	setType,
};
