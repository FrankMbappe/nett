import { StyleSheet } from "react-native";
import colors from "../../config/colors";

// <--- ProfileEditionScreen styles ---> //

const styles = StyleSheet.create({
	screen: {
		alignItems: "center",
	},

	// --- MAIN CONTAINER --- //
	mainContainer: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
		width: "85%",
		paddingBottom: 25,
	},

	// --> TITLE
	titleContainer: {
		width: "100%",
		paddingVertical: 20,
	},
	imagePicker: {
		marginTop: 30,
		marginBottom: 20,
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
