import client from "./client";

const endpoint = "/countries";

const getCountries = (search) => client.get(endpoint);

export default {
	getCountries,
};
