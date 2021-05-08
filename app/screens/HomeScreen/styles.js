import { StyleSheet } from "react-native";
import colors from "../../config/colors";

// <--- HomeScreen styles ---> //

const styles = StyleSheet.create({
	screen: {
		alignItems: "center",
	},

	// --> HEADER
	header: {
		backgroundColor: "skyblue",
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
