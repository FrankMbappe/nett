import { StyleSheet } from "react-native";

import colors from "../../config/colors";

// --- STYLES --- //
const styles = StyleSheet.create({
	codeExpirationContainer: {
		alignItems: "center",
	},
	container: {
		alignItems: "center",
		justifyContent: "center",
	},
	importantText: {
		fontWeight: "bold",
		fontSize: 22,
	},
	validationInputContainer: {
		borderColor: "red",
		borderWidth: 0,
		width: "100%",
		flexDirection: "row",
		marginTop: "5%",
	},
	mainBox: {
		alignItems: "center",
		justifyContent: "center",
		width: "85%",
		borderColor: "blue",
		borderWidth: 0,
		bottom: "10%",
	},
	resendCode: {
		width: "100%",
		top: "10%",
	},
	resendCodeContainer: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "center",
		top: "5%",
	},
	resendCodeDivider: {
		backgroundColor: colors.uiFront,
		opacity: 0.25,
		width: "100%",
	},
	resendLabel: {
		fontSize: 15,
		color: "grey",
	},
	resendLink: {
		fontSize: 15,
		color: colors.primary,
		paddingStart: 7,
	},
	textInput: {
		flex: 1,
	},
	title: {
		width: "60%",
	},
	tinyDescription: {
		marginTop: "7%",
	},
});

export default styles;
