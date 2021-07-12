import { formatRelative } from "date-fns";
import React from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import colors from "../../config/colors";
import currentUser from "../../config/test";
import { getEventProps } from "../../utils";
import Badge from "../Badge";
import NettText from "../Text";
import Author from "./Author";

function QuizCard({
	currentUserId,
	quiz: {
		author: { fullName: authorFullName, picUri: authorPicUri },
		classroom: classroomName,

		title,
		hasTimeInterval,
		dateOpening,
		dateClosing,
		isDeterministic,
		qas,
		haveSeen = [],
	},
	onPress,
	style,
}) {
	const properties = hasTimeInterval && getEventProps(dateOpening, dateClosing);

	return (
		<View style={styles.container}>
			<TouchableHighlight
				style={[styles.container, style]}
				onPress={onPress}
				underlayColor={colors.light}
			>
				{/* HEADER */}
				<View style={styles.headContainer}>
					{/* Display badge only if the user has never seen the post */}
					{!haveSeen.includes(currentUserId) && (
						<Badge style={{ marginEnd: 5 }} />
					)}

					<NettText style={styles.postType}>Quiz</NettText>

					<NettText style={styles.creationDate}>
						{formatRelative(new Date(creationDate), new Date())}
					</NettText>
				</View>

				{/* CONTENT */}
				<>
					<NettText style={styles.title}>{title}</NettText>
					<NettText style={styles.description}>{`🧮 ${qas.length} questions,  ${
						isDeterministic ? "✅ Deterministic" : "❓ Non-deterministic"
					}`}</NettText>
					<View style={styles.distanceToNowContainer}>
						<NettText
							style={[styles.distanceToNow, { color: properties.color }]}
							numberOfLines={1}
						>
							{properties.distanceToNow}
						</NettText>{" "}
					</View>
				</>

				{/* Footer */}
				<Author
					user={{
						fullName: authorFullName,
						picUri: currentUser.hostname + authorPicUri,
					}}
					classroomName={classroomName}
				/>
			</TouchableHighlight>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.appBack,
		borderRadius: 10,
		elevation: 3,
		flex: 1,
		width: 320,
		flexGrow: 0,
		margin: 5,
		maxWidth: 350,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
	},
	headContainer: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
		paddingBottom: 0,
	},
	postType: {
		fontWeight: "bold",
		flex: 1,
	},
	creationDate: {
		color: colors.medium,
		fontWeight: "600",
	},
	title: {
		fontSize: 25,
		fontWeight: "bold",
	},
	description: {
		fontSize: 15,
		color: colors.medium,
	},
	distanceToNow: {
		width: "100%",
		padding: 7,
		fontSize: 10,
		textAlign: "center",
		backgroundColor: "#fcfcfcbf",
		borderRadius: 7,
	},
	distanceToNowContainer: {
		padding: 10,
	},
});

export default QuizCard;
