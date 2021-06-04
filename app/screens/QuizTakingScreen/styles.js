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
		fontWeight: "700",
		fontSize: 28,
		marginVertical: 10,
		textAlign: "center",
	},
	authorAndClassroomContainer: {
		flexDirection: "row",
		alignItems: "center",
		margin: 10,
		justifyContent: "center",
	},
	header: {
		padding: 10,
	},
});

export default styles;
