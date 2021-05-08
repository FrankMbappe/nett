import { StyleSheet } from "react-native";
import colors from "../../config/colors";

// <--- ProfileEditionScreen styles ---> //

const styles = StyleSheet.create({
	screen: {
		alignItems: "center",
		padding: 0,
	},

	// --- MAIN CONTAINER --- //
	mainContainer: {
		alignItems: "center",
		flex: 1,
		width: "85%",
		paddingBottom: 25,
	},

	// --> TITLE
	titleContainer: {
		width: "100%",
		paddingVertical: 20,
	},

	// --> IMAGE PICKER
	imagePicker: {
		marginVertical: 30,
	},

	// --> BOTTOM BAR
	bottomBar: {
		backgroundColor: colors.appBack,
		padding: 20,
		paddingTop: 5,
		width: "100%",
	},
});

export default styles;
