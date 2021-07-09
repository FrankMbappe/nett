import { StyleSheet } from "react-native";
import colors from "../../config/colors";

// <--- ProfileEditionScreen styles ---> //

const styles = StyleSheet.create({
	screen: {},

	// --- MAIN CONTAINER --- //
	mainContainer: {
		flex: 1,
		paddingBottom: 25,
	},

	// --> TITLE
	titleContainer: {
		width: "100%",
		paddingVertical: 20,
	},

	// --> IMAGE PICKER
	profilePhotoPicker: {
		marginVertical: 30,
	},

	genderSelector: {
		marginTop: 5,
	},

	// --> BOTTOM BAR
	bottomBar: {
		backgroundColor: colors.appBack,
		padding: 10,
		paddingBottom: 5,
		width: "100%",
	},
});

export default styles;
