import client from "./client";

const endpoint = "/countries";

const getCountries = (search) => client.get(endpoint, { payload: { search } });

export default {
	getCountries,
};
