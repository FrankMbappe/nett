import { StyleSheet } from "react-native";
import colors from "../../config/colors";

// <--- WelcomeScreen styles ---> //

const styles = StyleSheet.create({
	screen: {
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		marginStart: 14,
		fontSize: 20,
		fontWeight: "bold",
	},

	// --- MAIN CONTAINER --- //
	mainContainer: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
		width: "85%",
	},
	profilePhoto: {
		height: 150,
		width: 150,
		borderRadius: 75,
	},
	fullName: {
		fontSize: 28,
		fontWeight: "bold",
		marginTop: 15,
	},
	type: {
		fontSize: 19,
		marginTop: 7,
		color: colors.medium,
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
