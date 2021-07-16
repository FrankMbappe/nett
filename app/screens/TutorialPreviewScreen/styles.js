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
		height: 300,
		justifyContent: "center",
		alignItems: "center",
	},
	tutorial: {
		backgroundColor: colors.lollipopLight,
		paddingVertical: 7,
		paddingHorizontal: 14,
		borderRadius: 20,
		fontSize: 18,
		fontWeight: "bold",
		color: colors.lollipop,
		marginTop: 25,
	},
	title: {
		fontSize: 40,
		fontWeight: "bold",
		maxWidth: "85%",
		marginTop: 20,
	},
	topics: {
		fontSize: 16,
		fontWeight: "bold",
		color: colors.lollipop,
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

	stepsContainer: {
		width: "100%",
	},
});

export default styles;
