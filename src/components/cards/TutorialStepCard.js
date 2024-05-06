import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../config/colors";
import ButtonIcon from "../ButtonIcon";
import NettText from "../Text";
import { VideoBundle } from "./bundles";

function TutorialStepCard({
	step: { title, description, videoUri },
	onPressRemove,
}) {
	return (
		<View style={styles.container}>
			<VideoBundle uri={videoUri} />
			<View style={styles.inputContainer}>
				<View style={styles.descriptionContainer}>
					<NettText
						style={styles.title}
						numberOfLines={2}
					>{`${title}`}</NettText>
					<NettText style={styles.description} numberOfLines={2}>
						{description}
					</NettText>
				</View>

				{/* Close button */}
				<ButtonIcon
					name="close"
					containerStyle={styles.deleteButton}
					size={15}
					onPress={onPressRemove}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "black",
		marginVertical: 5,
		borderRadius: 12,
	},
	inputContainer: {
		backgroundColor: colors.white,
		margin: 12,
		marginTop: 0,
		padding: 10,
		borderRadius: 10,
		flexDirection: "row",
		alignItems: "center",
	},
	descriptionContainer: {
		flex: 1,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
	},
	description: {
		fontSize: 13,
		color: colors.medium,
	},
	deleteButton: {
		backgroundColor: colors.light,
		borderRadius: 15,
		height: 30,
		width: 30,
	},
});

export default TutorialStepCard;
