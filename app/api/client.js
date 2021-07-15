import { create } from "apisauce";
import cache from "../utils/cache";

const apiClient = create({
	baseURL: "http://192.168.8.100:3000/api",
	headers: {
		"x-auth-token":
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGUx" +
			"MGJlYTQyNmI4ODJmZDRlOTc1MzEiLCJfdHlwZSI6InRlYWNoZXIiL" +
			"CJwaG9uZSI6IisyMzc2NTY4OTUzNDgiLCJpYXQiOjE2MjU0Nzc2NT" +
			"R9.xQG8o7rOkImMFktIDNOXcZP_hsYurfZ9kkcLI0g9fZY",
	},
});

// Intercepting API calls to deal with the cache
const get = apiClient.get;
apiClient.get = async (url, params, axiosConfig) => {
	/* I firstly call the original get() method */
	const response = await get(url, params, axiosConfig);

	/* If the response is OK, I store it in the cache */
	if (response.ok) {
		// TODO: Add a whitelist to not put every request in the cache
		cache.store(url, response.data);
		return response;
	}

	/* If the response is not Ok (e.g., server is unreachable),
	   I try to get the cached value and return it if available*/
	const data = cache.get(url);
	return data ? { ok: true, data } : response;
};

export default apiClient;
