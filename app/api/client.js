import { create } from "apisauce";
import authStorage from "../auth/storage";
import cache from "../utils/cache";

const apiClient = create({
	baseURL: "http://192.168.8.101:3000/api",
});

// In order to query protected routes
apiClient.addAsyncRequestTransform(async (request) => {
	const authToken = await authStorage.getToken();

	if (!authToken) return;

	request.headers["x-auth-token"] = authToken;
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
