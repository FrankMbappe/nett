import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import Author from "./Author";
import NettText from "../Text";
import TextIcon from "../TextIcon";
import colors from "../../config/colors";
import { formatWordCount } from "../../utils";

function ClassroomCard({
	// Data
	classroom: { name: classroomName, nbOfParticipants },
	teacher: { fullName: teacherFullName, picUri: teacherPicUri },

	// UI
	style,
	onPress,
}) {
	return (
		<TouchableOpacity style={[styles.container, style]} onPress={onPress}>
			<NettText style={styles.name} numberOfLines={3}>
				{classroomName}
			</NettText>
			<View style={styles.statsContainer}>
				<TextIcon
					icon="account-multiple"
					text={`${formatWordCount(nbOfParticipants, "participant")}`}
					fontSize={12}
				/>
			</View>
			<Author
				user={{
					fullName: teacherFullName,
					picUri: teacherPicUri,
				}}
				name={classroomName}
			/>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.appBack,
		borderRadius: 10,
		elevation: 3,
		height: 170,
		margin: 5,
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
