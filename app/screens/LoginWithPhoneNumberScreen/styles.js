import { StyleSheet } from "react-native";
import colors from "../../config/colors";

// <--- LoginWithPhoneNumberScreen styles ---> //

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

	// --> INPUT
	inputContainer: {
		width: "100%",
		flexDirection: "row",
		marginTop: 30,
		alignItems: "center",
	},
	countryIndicator: {
		fontWeight: "bold",
		fontSize: 22,
		marginEnd: 15,
	},
	inputSubContainer: {
		flex: 1,
	},
	input: {
		flex: 1,
	},

	// --> INPUT DESCRIPTION
	inputDescription: {
		marginTop: 10,
		color: colors.medium,
		textAlign: "center",
	},

	// --> BOTTOM BAR
	bottomBar: {
		paddingTop: 0,
		paddingHorizontal: 10,
		paddingBottom: 10,
		width: "100%",
		backgroundColor: colors.appBack,
	},
});

export default styles;
