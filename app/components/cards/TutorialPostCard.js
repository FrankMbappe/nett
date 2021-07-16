import { formatRelative } from "date-fns";
import React from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import colors from "../../config/colors";
import { formatWordCount } from "../../utils";
import Badge from "../Badge";
import NettText from "../Text";
import Author from "./Author";
import { VideoBundle } from "./bundles";

function TutorialPostCard({
	currentUserId,
	tutorial: {
		creationDate,
		author: { fullName: authorFullName, picUri: authorPicUri },
		classroom: classroomName,

		title,
		steps,
		haveSeen = [],
	},
	onPress,
	style,
}) {
	return (
		<TouchableHighlight
			style={[styles.container, style]}
			onPress={onPress}
			underlayColor={colors.light}
		>
			<>
				{/* HEADER */}
				<View style={styles.headContainer}>
					{/* Display badge only if the user has never seen the post */}
					{!haveSeen.includes(currentUserId) && (
						<Badge style={{ marginEnd: 5 }} />
					)}

					<NettText style={styles.postType}>Tutorial</NettText>

					<NettText style={styles.creationDate}>
						{formatRelative(new Date(creationDate), new Date())}
					</NettText>
				</View>

				<View style={styles.preview}>
					<VideoBundle uri={steps[0].videoUri} containerStyle={styles.video} />
				</View>

				{/* CONTENT */}
				<View style={styles.titleContainer}>
					<NettText style={styles.title}>{title}</NettText>
					<NettText style={styles.description}>{`🎗 ${formatWordCount(
						steps.length,
						"step"
					)}`}</NettText>
				</View>

				{/* Footer */}
				<Author
					style={styles.authorContainer}
					user={{
						fullName: authorFullName,
						picUri: authorPicUri,
					}}
					classroomName={classroomName}
				/>
			</>
		</TouchableHighlight>
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
		width: "100%",
		padding: 10,
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
	preview: {
		borderRadius: 20,
	},
	video: {
		marginTop: 0,
		height: 150,
	},
	titleContainer: {
		padding: 10,
	},
	authorContainer: {
		paddingHorizontal: 10,
		paddingBottom: 10,
	},
});

export default TutorialPostCard;
