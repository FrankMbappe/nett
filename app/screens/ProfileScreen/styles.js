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

	// --> BOTTOM BAR
	bottomBar: {
		padding: 10,
		paddingBottom: 5,
		width: "100%",
		backgroundColor: colors.appBack,
	},
	logoutButton: {
		marginBottom: 5,
	},
});

export default styles;
