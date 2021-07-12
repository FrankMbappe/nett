import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import NettButton from "../../components/Button";
import ButtonIcon from "../../components/ButtonIcon";
import Label from "../../components/Label";
import Selector from "../../components/Selector";
import ShortModal from "../../components/ShortModal";
import NettText from "../../components/Text";
import NettTextInput from "../../components/TextInput";
import colors from "../../config/colors";

function TopicModal({ isVisible, onTapOutside, onSubmit }) {
	// States
	const [topic, setTopic] = useState();

	// Action handlers
	const handleOnShow = () => {
		setTopic("");
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
					<Label style={styles.label} value="📚 Specify a topic" />

					{/* Close button */}
					<ButtonIcon
						name="close"
						containerStyle={styles.modalCloseButton}
						size={15}
						onPress={onTapOutside}
					/>
				</View>

				<View style={styles.topicContainer}>
					<NettTextInput
						placeholder="What topic does your QA target?"
						fontSize={18}
						value={topic}
						onChangeText={(text) => setTopic(text)}
					/>
					<NettText style={styles.topicDescription}>
						{
							'It tells which domain is this question about. An example of a topic can be "Sports 🏀" or "Chemistry 🧪".'
						}
					</NettText>
				</View>

				{/* Submit button */}
				<NettButton
					text="Submit"
					disabled={!topic}
					onPress={() => onSubmit && onSubmit(topic)}
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
		marginBottom: 15,
	},
	mainContainer: {
		flex: 1,
		padding: 12,
	},
	description: {
		fontSize: 14,
		color: colors.medium,
		alignSelf: "center",
	},
	topicContainer: {
		flex: 1,
	},
	selector: {
		marginVertical: 10,
	},
	topicDescription: {
		fontSize: 15,
		color: colors.medium,
		textAlign: "center",
		marginTop: 10,
	},
});

export default TopicModal;
