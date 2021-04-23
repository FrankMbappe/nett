import { StyleSheet } from "react-native";

// <--- LoginWithPhoneNumberScreen styles ---> //

const styles = StyleSheet.create({
	screen: {
		alignItems: "center",
		justifyContent: "center",
	},

	// --- MAIN CONTAINER --- //
	mainContainer: {
		alignItems: "center",
		justifyContent: "center",
		width: "85%",
		bottom: "10%",
	},

	// --> TITLE
	titleContainer: {
		width: "60%",
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
	input: {
		flex: 1,
	},

	// --> INPUT DESCRIPTION
	inputDescription: {
		marginTop: "7%",
	},
});

export default styles;
