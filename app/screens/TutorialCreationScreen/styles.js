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
	stepTip: {
		flex: 1,
		color: colors.medium,
		alignSelf: "center",
		fontSize: 15,
		marginVertical: 15,
	},
	addStepButton: {
		bottom: 75,
	},
	stepListContainer: {
		paddingBottom: 75,
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
