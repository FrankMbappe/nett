import { StyleSheet } from "react-native";

// --- STYLES --- //
const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
	},
	importantText: {
		fontWeight: "bold",
		fontSize: 22,
		padding: 10,
	},
	inputContainer: {
		borderColor: "red",
		borderWidth: 0,
		width: "100%",
		flexDirection: "row",
		marginTop: "10%",
		alignItems: "center",
	},
	mainBox: {
		alignItems: "center",
		justifyContent: "center",
		width: "85%",
		borderColor: "blue",
		borderWidth: 0,
		bottom: "10%",
	},
	textInput: {
		flex: 1,
	},
	title: {
		width: "50%",
	},
	tinyDescription: {
		marginTop: "7%",
	},
});

export default styles;
