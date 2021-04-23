import { StyleSheet } from "react-native";

// <--- AccountTypeSelection styles ---> //

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
		bottom: "5%",
	},

	// --> TITLE
	titleContainer: {
		width: "75%",
	},

	// --> TYPE SELECTOR
	typeSelector: {
		marginTop: "5%",
	},
});

export default styles;
