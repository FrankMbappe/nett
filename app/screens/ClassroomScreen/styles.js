import { StyleSheet } from "react-native";
import colors from "../../config/colors";

// <--- ClassroomScreen styles ---> //

const styles = StyleSheet.create({
	screen: {
		padding: 0,
		paddingTop: 0,
	},

	// --> TOPBAR
	topBar: {
		backgroundColor: colors.appBack,
	},
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
		backgroundColor: colors.appBack,
	},
	topicFlatListContent: {
		paddingVertical: 7,
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

	postFlatListContent: {
		paddingHorizontal: 15,
	},
	createPostButton: {},

	// --- FOOTER --- //
	footer: {
		position: "absolute",
		width: "100%",
		bottom: 0,
		backgroundColor: colors.optimal,
		justifyContent: "center",
		paddingHorizontal: 10,
		height: 30,
	},
	footerText: {
		color: colors.white,
		fontWeight: "bold",
		fontSize: 12,
	},
});

export default styles;
