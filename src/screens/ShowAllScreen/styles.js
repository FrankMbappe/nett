import { StyleSheet } from "react-native";
import colors from "../../config/colors";

// <--- ShowAllScreen styles ---> //

const styles = StyleSheet.create({
	topBar: {
		paddingHorizontal: 5,
		height: 50,
	},
	backButton: {
		marginEnd: 10,
	},
	titleContainer: {
		flex: 1,
	},
	title: {
		fontWeight: "bold",
	},
});

export default styles;
