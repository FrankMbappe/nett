import { StyleSheet } from "react-native";
import colors from "../../config/colors";

// <--- QACreationScreen styles ---> //

const styles = StyleSheet.create({
	screen: {},
	topBar: {},
	topBarTitle: {
		fontWeight: "bold",
		fontSize: 20,
		flex: 1,
		marginStart: 10,
	},
	mainContainer: {
		flex: 1,
	},
	addTimerButton: {
		margin: 7,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.29,
		shadowRadius: 4.65,
		elevation: 7,
	},
	allottedTimeContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.optimalLight,
		paddingVertical: 5,
		paddingHorizontal: 8,
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		elevation: 6,
		margin: 5,
	},
	allottedTimeTextContainer: {
		flex: 1,
	},
	allottedTimeText: {
		fontWeight: "bold",
	},
	label: {
		marginBottom: 0,
	},
	labelDescription: {
		color: colors.medium,
		fontSize: 12,
		marginStart: 10,
		marginBottom: 10,
	},
	questionContainer: {
		flex: 1,
	},
	questionInput: {
		height: 180,
		backgroundColor: colors.appBack,
		alignItems: "flex-start",
		padding: 10,
	},
	characterCount: {
		marginTop: 7,
		fontSize: 15,
		alignSelf: "flex-end",
	},
	characterCountLabel: {
		color: colors.medium,
	},
	characterCountValue: {
		fontWeight: "700",
	},
	divider: {
		marginVertical: 10,
	},
	answerContainer: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderRadius: 14,
		marginBottom: 7,
	},
	answerText: {
		flex: 1,
		fontSize: 16,
		fontWeight: "700",
		marginEnd: 3,
	},
	answerCountLabel: {
		marginTop: 12,
		color: colors.medium,
		alignSelf: "center",
	},
	addAnswerButton: {
		margin: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		elevation: 6,
	},

	// --> BOTTOM BAR
	bottomBar: {
		padding: 10,
		paddingBottom: 5,
		width: "100%",
		backgroundColor: colors.appBack,
	},
});

export default styles;
