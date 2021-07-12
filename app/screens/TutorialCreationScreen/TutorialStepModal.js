import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import NettButton from "../../components/Button";
import ButtonIcon from "../../components/ButtonIcon";
import { VideoBundle } from "../../components/cards/bundles";
import Label from "../../components/Label";
import ShortModal from "../../components/ShortModal";
import NettTextInput from "../../components/TextInput";
import colors from "../../config/colors";

function TutorialStepModal({ videoFile, isVisible, onTapOutside, onSubmit }) {
	// States
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	// Action handlers
	const handleOnShow = () => {
		setTitle("");
		setDescription("");
	};

	return (
		<ShortModal
			visible={isVisible}
			onRequestClose={onTapOutside}
			onShow={handleOnShow}
		>
			<View style={styles.mainContainer}>
				{/* Header */}
				<View style={styles.header}>
					<Label style={styles.label} value="🎬 Tutorial step" />

					{/* Close button */}
					<ButtonIcon
						name="close"
						containerStyle={styles.modalCloseButton}
						size={15}
						onPress={onTapOutside}
					/>
				</View>

				<View style={styles.fieldsContainer}>
					<VideoBundle
						uri={videoFile && videoFile.uri}
						containerStyle={styles.video}
					/>

					<NettTextInput
						containerStyle={styles.titleInput}
						placeholder="What is the title of this step?"
						onChangeText={(text) => setTitle(text)}
						value={title}
					/>
					<NettTextInput
						containerStyle={styles.descriptionInput}
						placeholder="Describe what's happening"
						onChangeText={(text) => setDescription(text)}
						value={description}
						multiline
					/>
				</View>

				{/* Submit button */}
				<NettButton
					text="Submit"
					disabled={!videoFile || !title}
					onPress={() =>
						onSubmit && onSubmit({ title, description, videoFile })
					}
				/>
			</View>
		</ShortModal>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		alignItems: "center",
	},
	label: { flex: 1, fontSize: 18 },
	modalCloseButton: {
		alignItems: "center",
		backgroundColor: colors.light,
		borderRadius: 15,
		height: 30,
		width: 30,
		justifyContent: "center",
	},
	mainContainer: {
		flex: 1,
		padding: 12,
	},
	descriptionInput: {
		height: 120,
		alignItems: "flex-start",
		padding: 15,
		marginVertical: 12,
	},
	titleInput: {
		marginTop: 10,
	},
	fieldsContainer: {
		flex: 1,
	},
	video: {
		borderRadius: 15,
	},
});

export default TutorialStepModal;
