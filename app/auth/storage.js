import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";

const key = "nettAuthToken";

// Storing the token
const storeToken = async (authToken) => {
	try {
		await SecureStore.setItemAsync(key, authToken);
	} catch (error) {
		console.log("Something went wrong while storing the auth token.", error);
	}
};

// Getting the token
const getToken = async () => {
	try {
		return await SecureStore.getItemAsync(key);
	} catch (error) {
		console.log("Something went wrong while getting the auth token.", error);
	}
};

const getCurrentUser = async () => {
	const token = await getToken();
	return token ? jwtDecode(token) : null;
};

// Remove the token
const removeToken = async () => {
	try {
		await SecureStore.deleteItemAsync(key);
	} catch (error) {
		console.log("Something went wrong while removing the auth token.", error);
	}
};

export default { getToken, getCurrentUser, removeToken, storeToken };
