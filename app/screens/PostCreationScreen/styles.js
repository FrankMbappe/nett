import { StyleSheet } from "react-native";
import colors from "../../config/colors";

// <--- PostCreationScreen styles ---> //

const styles = StyleSheet.create({
	screen: {},
	topBar: {},
	topBarTitle: {
		fontWeight: "bold",
		fontSize: 20,
		flex: 1,
		marginStart: 10,
	},
	mainContainer: {
		flex: 1,
	},
	authorAndClassroomsContainer: {},
	inputContainer: {
		flex: 1,
	},
	input: {
		flex: 1,
		backgroundColor: colors.appBack,
		alignItems: "flex-start",
	},
	characterCount: {
		marginTop: 7,
		fontSize: 15,
		alignSelf: "flex-end",
	},
	characterCountLabel: {
		color: colors.medium,
	},
	characterCountValue: {
		fontWeight: "700",
	},
	bundleContainer: {
		marginTop: 5,
	},

	// --> BOTTOM BAR
	bottomBar: {
		padding: 10,
		paddingBottom: 5,
		width: "100%",
		backgroundColor: colors.appBack,
	},
});

export default styles;
