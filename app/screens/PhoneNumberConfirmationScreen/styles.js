import { StyleSheet } from "react-native";

import colors from "../../config/colors";

// <--- PhoneNumberConfirmationScreen styles ---> //

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
	inputDescription: {
		marginTop: 25,
	},
	inputContainer: {
		width: "100%",
		flexDirection: "row",
		marginTop: "5%",
	},
	codeInput: {
		flex: 1,
	},

	// --> TIMER
	timerContainer: {
		alignItems: "center",
	},
	timerDescription: {
		marginTop: 25,
	},
	timer: {
		fontWeight: "bold",
		fontSize: 24,
		top: 3,
	},

	// --> RESEND CODE
	resendCodeContainer: {
		top: 30,
		width: "100%",
	},
	resendCodeDivider: {
		backgroundColor: colors.appFront,
		opacity: 0.15,
		width: "100%",
	},
	resendCodeTextContainer: {
		top: 20,
		width: "100%",
		flexDirection: "row",
		justifyContent: "center",
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
});

export default styles;
