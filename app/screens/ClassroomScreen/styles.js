import { StyleSheet } from "react-native";
import colors from "../../config/colors";

// <--- ClassroomScreen styles ---> //

const styles = StyleSheet.create({
	screen: {
		padding: 0,
		paddingTop: 5,
	},

	// --> TOPBAR
	topBar: {},
	classroomPic: {},
	topBarTitleContainer: {
		flex: 1,
		marginStart: 10,
	},
	topBarTitle: {
		fontWeight: "bold",
		fontSize: 15,
	},
	topBarCaption: {
		fontSize: 12,
		color: colors.medium,
	},

	// --> TOPICS
	topicFlatListContainer: {
		paddingHorizontal: 7,
	},
	topicFlatListContent: {
		paddingVertical: 10,
	},
	topicFlatList: {
		borderColor: colors.appBack,
		borderWidth: 2,
	},
	topic: {
		alignSelf: "center",
		fontSize: 12,
		paddingVertical: 7,
		paddingHorizontal: 12,
		borderRadius: 15,
		backgroundColor: colors.optimalLight,
		color: colors.optimal,
		marginEnd: 5,
	},

	// --> POSTS
	postFlatListContainer: {
		flex: 1,
	},
	postFlatListContent: {
		paddingHorizontal: 15,
	},
	postFlatListBackground: {
		position: "absolute",
		height: "100%",
		width: "100%",
	},

	// --- FOOTER --- //
	footer: {
		position: "absolute",
		width: "100%",
		bottom: 0,
		backgroundColor: colors.appBack,
		padding: 15,
	},
});

export default styles;
