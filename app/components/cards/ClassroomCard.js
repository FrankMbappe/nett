import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../config/colors";
import NettText from "../Text";
import TextIcon from "../TextIcon";
import Author from "./Author";

function getNumberOfParticipants(classroom) {
	return classroom.students.length + classroom.consultants.length + 1;
}

function ClassroomCard({ classroom, ...otherProps }) {
	return (
		<TouchableOpacity
			style={[styles.container, otherProps.style]}
			onPress={otherProps.onPress}
		>
			<NettText style={styles.name} numberOfLines={3}>
				{classroom.name}
			</NettText>
			<View style={styles.statsContainer}>
				<TextIcon
					icon="account-multiple"
					text={
						classroom.nbOfParticipants
							? classroom.nbOfParticipants
							: getNumberOfParticipants(classroom)
					}
					fontSize={12}
					containerStyle={{ marginEnd: 12 }}
				/>
				<TextIcon
					icon="chart-timeline-variant"
					text={`${classroom.postsPerDay} posts/day`}
					fontSize={12}
				/>
			</View>
			<Author
				name={classroom.teacher.profile.fullName}
				pic={{ uri: classroom.teacher.profile.picUrl }}
			/>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.appBack,
		borderRadius: 10,
		elevation: 3,
		height: 188,
		marginEnd: 5,
		padding: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		width: 188,
	},
	name: {
		flex: 1,
		fontSize: 30,
		textTransform: "uppercase",
	},
	statsContainer: { flexDirection: "row", marginVertical: 3 },
});

export default ClassroomCard;
