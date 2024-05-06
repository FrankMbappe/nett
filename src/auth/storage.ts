import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";
import User from "src/models/User";

const key = "nettAuthToken";

// Storing the token
const storeToken = async (authToken: string) => {
  try {
    await SecureStore.setItemAsync(key, authToken);
  } catch (error) {
    console.log(authToken);
    console.error("Storing auth token:", error);
  }
};

// Getting the token
const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.error("Getting auth token:", error);
  }
};

const getCurrentUser = async () => {
  const token = await getToken();
  return token ? jwtDecode<User>(token) : null;
};

// Remove the token
const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error("Removing auth token:", error);
  }
};

export default { getToken, getCurrentUser, removeToken, storeToken };
