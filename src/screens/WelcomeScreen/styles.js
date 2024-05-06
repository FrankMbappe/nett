import { StyleSheet } from "react-native";
import colors from "../../config/colors";

// <--- WelcomeScreen styles ---> //

const styles = StyleSheet.create({
	screen: {
		alignItems: "center",
		justifyContent: "center",
	},

	// --- MAIN CONTAINER --- //
	mainContainer: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
		width: "85%",
	},

	// --> TITLE
	titleContainer: {
		width: "65%",
	},

	// --> BOTTOM BAR
	bottomBar: {
		padding: 10,
		paddingBottom: 5,
		width: "100%",
		backgroundColor: colors.appBack,
	},
	loginButton: {
		marginBottom: 5,
	},
});

export default styles;
