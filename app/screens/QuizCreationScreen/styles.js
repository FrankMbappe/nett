import { StyleSheet } from "react-native";
import colors from "../../config/colors";

// <--- QuizCreationScreen styles ---> //

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
	titleInput: {
		marginBottom: 15,
	},
	descriptionInput: {
		height: 120,
		alignItems: "flex-start",
		padding: 15,
	},
	divider: {
		marginVertical: 15,
	},
	qaTip: {
		flex: 1,
		color: colors.medium,
		alignSelf: "center",
		fontSize: 15,
		marginVertical: 15,
	},
	addQAButton: {
		position: "absolute",
		backgroundColor: colors.appPrimary,
		height: 60,
		width: 60,
		borderRadius: 30,
		bottom: 100,
		end: 20,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.27,
		shadowRadius: 4.65,

		elevation: 6,
	},
	qaListContainer: {},

	// --> BOTTOM BAR
	bottomBar: {
		padding: 10,
		paddingBottom: 5,
		width: "100%",
		backgroundColor: colors.appBack,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-evenly",
	},
});

export default styles;
