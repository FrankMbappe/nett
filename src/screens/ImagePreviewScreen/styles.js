import { StyleSheet } from "react-native";
import colors from "../../config/colors";

// <--- WelcomeScreen styles ---> //

const styles = StyleSheet.create({
	image: {
		flex: 1,
	},
	screen: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "black",
	},
	mainContainer: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
		width: "85%",
	},
});

export default styles;
