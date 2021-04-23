import { StyleSheet } from "react-native";

// <--- UserChatListScreen styles ---> //

const styles = StyleSheet.create({
	screen: {
		alignItems: "center",
		justifyContent: "center",
		borderColor: "red",
		borderWidth: 0,
	},

	// --> FLATLIST
	flatList: {
		width: "100%",
		borderColor: "blue",
		borderWidth: 0,
	},
	listItem: {
		paddingVertical: 7,
	},
});

export default styles;
