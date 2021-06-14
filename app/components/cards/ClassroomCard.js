import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../config/colors";
import NettText from "../Text";
import TextIcon from "../TextIcon";
import Author from "./Author";

function ClassroomCard({
	name,
	nbOfParticipants,
	postsPerDay,
	style,
	teacherProfile: { fullName, picUri },
	onPress,
}) {
	return (
		<TouchableOpacity style={[styles.container, style]} onPress={onPress}>
			<NettText style={styles.name} numberOfLines={3}>
				{name}
			</NettText>
			<View style={styles.statsContainer}>
				<TextIcon
					icon="account-multiple"
					text={nbOfParticipants}
					fontSize={12}
					containerStyle={{ marginEnd: 12 }}
				/>
				<TextIcon
					icon="chart-timeline-variant"
					text={`${postsPerDay} posts/day`}
					fontSize={12}
				/>
			</View>
			<Author name={fullName} picUri={{ uri: picUri }} />
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.appBack,
		borderRadius: 10,
		elevation: 3,
		height: 180,
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
