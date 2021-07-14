import apiClient from "./client";

const endpoint = "/auth";

// Sending phone number confirmation
const sendConfirmationCode = (phone) => {
	const data = { phone };
	return apiClient.get(endpoint, data);
};

// Verifying phone number
const verify = (phone, code) => {
	const data = { phone, code };
	return apiClient.get(endpoint + "/confirm", data);
};

export default {
	sendConfirmationCode,
	verify,
};
