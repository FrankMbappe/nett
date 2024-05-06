import apiClient from "./client";

const endpoint = "/countries";

const getCountries = () => apiClient.get(endpoint);

export default {
	getCountries,
};
