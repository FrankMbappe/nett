import client from "./client";

const endpoint = "/auth";

const register = (phone) => client.post(endpoint, { phone });
const confirm = (phone, code) =>
	client.post(endpoint + "/confirm", { phone, code });

export default {
	register,
	confirm,
};
