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
		alignItems: "flex-start",
	},

	dialCodeContainer: {
		marginEnd: 10,
	},
	dialCodeText: {
		fontWeight: "bold",
		fontSize: 22,
	},

	phoneInput: {
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
		padding: 10,
		paddingBottom: 5,
		width: "100%",
		backgroundColor: colors.appBack,
	},
});

export default styles;
