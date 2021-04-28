import { StyleSheet } from "react-native";

// <--- AccountTypeSelection styles ---> //

const styles = StyleSheet.create({
	screen: {
		alignItems: "center",
	},

	// --- MAIN CONTAINER --- //
	mainContainer: {
		alignItems: "center",
		justifyContent: "center",
		width: "85%",
		flex: 1,
	},

	// --> TITLE
	titleContainer: {
		width: 250,
	},

	// --> TYPE SELECTOR
	typeSelector: {
		marginTop: 15,
	},

	// --> BOTTOM BAR
	bottomBar: {
		paddingTop: 0,
		paddingHorizontal: 10,
		paddingBottom: 10,
		width: "100%",
	},
});

export default styles;
