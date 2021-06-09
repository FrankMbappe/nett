import { StyleSheet } from "react-native";
import colors from "../../config/colors";

// <--- QuizTakingScreen styles ---> //

const styles = StyleSheet.create({
	authorAndClassroom: {
		alignItems: "center",
		fontWeight: "700",
		color: colors.medium,
		fontSize: 12,
		marginStart: 10,
	},
	picAuthor: {
		width: 25,
		height: 25,
		borderRadius: 12,
		backgroundColor: colors.light,
	},
	title: {
		fontSize: 28,
		fontWeight: "700",
		marginTop: 10,
		textAlign: "center",
	},
	authorAndClassroomContainer: {
		flexDirection: "row",
		alignItems: "center",
		margin: 10,
		justifyContent: "center",
	},
	header: {
		paddingHorizontal: 10,
	},
	indicatorsBar: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-around",
		padding: 10,
		marginTop: 10,
		width: "100%",
	},
});

export default styles;
