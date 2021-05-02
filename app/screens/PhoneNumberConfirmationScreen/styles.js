import { StyleSheet } from "react-native";

import colors from "../../config/colors";

// <--- PhoneNumberConfirmationScreen styles ---> //

const styles = StyleSheet.create({
	screen: {
		alignItems: "center",
	},

	// --- MAIN CONTAINER --- //
	mainContainer: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
		width: "90%",
	},

	// --> TITLE
	titleContainer: {
		width: 200,
	},

	// --> INPUT
	inputDescription: {
		marginTop: 20,
		color: colors.medium,
		textAlign: "center",
	},
	inputContainer: {
		width: "100%",
		flexDirection: "row",
		marginTop: 10,
	},
	codeInput: {
		flex: 1,
	},

	// --> TIMER
	timerContainer: {
		marginTop: 25,
		alignItems: "center",
		width: "100%",
	},
	timerDescription: {
		fontSize: 15,
		color: colors.medium,
		textAlign: "center",
	},
	timer: {
		fontWeight: "bold",
		fontSize: 24,
		marginTop: 5,
	},

	// --> RESEND CODE
	resendCodeContainer: {
		marginTop: 10,
		width: "100%",
	},
	resendCodeDivider: {
		backgroundColor: colors.mediumLight,
		width: "100%",
	},
	resendCodeTextContainer: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "center",
		paddingTop: 10,
	},
	resendCodeLabel: {
		fontSize: 15,
		color: "grey",
	},
	resendCodeLink: {
		fontSize: 15,
		color: colors.appPrimary,
		paddingStart: 7,
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
