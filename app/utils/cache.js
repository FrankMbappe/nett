import AsyncStorage from "@react-native-async-storage/async-storage";
import { differenceInMinutes, parse } from "date-fns";

const prefix = "cache";
const expiryInMinutes = 5;

const store = async (key, value) => {
	try {
		const item = {
			value,
			timestamp: Date.now(),
		};
		await AsyncStorage.setItem(prefix + key, JSON.stringify(item));
	} catch (error) {
		console.log(error);
	}
};

const isExpired = (item) => {
	return (
		differenceInMinutes(Date.now(), parse(item.timestamp)) > expiryInMinutes
	);
};

const get = async (key) => {
	try {
		const value = await AsyncStorage.getItem(prefix + key);
		const item = JSON.parse(value);

		if (!item) return null;

		if (isExpired(item)) {
			await AsyncStorage.removeItem(prefix + key);
			return null;
		}

		return item.value;
	} catch (error) {
		console.log(error);
	}
};

export default { store, get };
