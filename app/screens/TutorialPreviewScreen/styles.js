import { StyleSheet } from "react-native";
import colors from "../../config/colors";

const styles = StyleSheet.create({
	screen: {},
	topBarTitle: {
		fontWeight: "bold",
		fontSize: 20,
		flex: 1,
		marginStart: 10,
	},

	// --- MAIN CONTAINER --- //
	mainContainer: {
		alignItems: "center",
		flex: 1,
	},
	titleContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	quiz: {
		backgroundColor: colors.electricLight,
		paddingVertical: 7,
		paddingHorizontal: 14,
		borderRadius: 20,
		fontSize: 18,
		fontWeight: "bold",
		color: colors.electric,
	},
	title: {
		fontSize: 40,
		fontWeight: "bold",
		maxWidth: "85%",
		marginTop: 50,
	},
	topics: {
		fontSize: 16,
		fontWeight: "bold",
		color: colors.appPrimary,
		marginTop: 7,
	},
	authorInfoContainer: {
		alignItems: "center",
		marginTop: 50,
	},
	authorInfo: {
		flexDirection: "row",
		alignItems: "center",
	},
	authorPic: {
		height: 30,
		width: 30,
		borderRadius: 15,
	},
	authorName: {
		marginStart: 10,
		fontSize: 18,
		fontWeight: "bold",
	},
	creationDate: {
		fontSize: 12,
		marginTop: 4,
		color: colors.medium,
	},
	descriptionContainer: {
		width: "100%",
		paddingTop: 25,
		paddingHorizontal: 15,
		paddingBottom: 30,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: "#dfdfdf",
	},
	label: {
		marginStart: 0,
	},
	description: {
		fontSize: 16,
	},

	distanceToNow: {
		width: "100%",
		fontSize: 16,
		textAlign: "center",
		fontWeight: "bold",
	},
	distanceToNowContainer: {
		width: "100%",
		marginHorizontal: 5,
		marginVertical: 7,
		padding: 15,
		borderRadius: 7,
	},

	// --> BOTTOM BAR
	bottomBar: {
		padding: 10,
		paddingBottom: 0,
		width: "100%",
		backgroundColor: colors.appBack,
	},
	beginButton: {
		marginBottom: 5,
	},
});

export default styles;
