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
		marginEnd: 15,
	},
	inputContainer: {
		width: "100%",
		flexDirection: "row",
		marginTop: 30,
		alignItems: "center",
	},
	mainBox: {
		alignItems: "center",
		justifyContent: "center",
		width: "85%",
		bottom: "10%",
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
