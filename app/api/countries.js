import client from "./client";

const endpoint = "/countries";

const getCountries = () => client.get(endpoint);

export default {
	getCountries,
};
