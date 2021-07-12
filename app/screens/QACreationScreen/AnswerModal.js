import React, { useEffect, useState } from "react";
import { View, StyleSheet, Modal, KeyboardAvoidingView } from "react-native";
import BinarySelector from "../../components/BinarySelector";
import NettButton from "../../components/Button";
import ButtonIcon from "../../components/ButtonIcon";
import Label from "../../components/Label";
import NettText from "../../components/Text";
import NettTextInput from "../../components/TextInput";
import colors from "../../config/colors";

function AnswerModal({
	isVisible,
	onTapOutside,
	onSubmit,
	maxTextLength = 120,
}) {
	// States
	const [text, setText] = useState("");
	const [isGood, setIsGood] = useState(true);

	// Action handlers
	const handleSelectionChange = (selection) => {
		// If the selection contains "good", it's a correct answer
		if (String(selection).toLowerCase().includes("good"))
			return setIsGood(true);
		// In any other case, it's a wrong answer
		setIsGood(false);
	};
	const handleOnShow = () => {
		setText("");
		setIsGood(true);
	};

	return (
		<Modal
			visible={isVisible}
			animationType="slide"
			onRequestClose={onTapOutside}
			onShow={handleOnShow}
			transparent
		>
			<KeyboardAvoidingView style={styles.container}>
				<View style={styles.mainContainer}>
					{/* Header */}
					<View style={styles.header}>
						<Label style={styles.label} value="Answer" />

						{/* Close button */}
						<ButtonIcon
							name="close"
							containerStyle={styles.modalCloseButton}
							size={15}
							onPress={onTapOutside}
						/>
					</View>

					{/* Text input */}
					<View style={styles.inputContainer}>
						<NettTextInput
							containerStyle={styles.input}
							multiline
							maxLength={maxTextLength}
							onChangeText={(text) => setText(text)}
							placeholder="Start typing..."
							value={text}
						/>
					</View>
					<NettText style={styles.characterCount}>
						<NettText style={styles.characterCountLabel}>
							{"Remaining characters:  "}
						</NettText>
						<NettText
							style={styles.characterCountValue}
						>{`${text.length} / ${maxTextLength}`}</NettText>
					</NettText>

					{/* Good or bad answer */}
					<BinarySelector
						left="✅ Good"
						right="❌ Bad"
						style={styles.goodOrBad}
						onSelectionChange={(selection) => handleSelectionChange(selection)}
					/>

					{/* Submit button */}
					<NettButton
						text="Submit"
						disabled={!text}
						onPress={() => onSubmit && onSubmit(text, isGood)}
					/>
				</View>
			</KeyboardAvoidingView>
		</Modal>
	);
}

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		width: "100%",
		minHeight: 250,
		bottom: 0,
		backgroundColor: colors.appBack,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 12,
		},
		shadowOpacity: 0.85,
		shadowRadius: 16.16,

		elevation: 20,
	},
	header: {
		flex: 1,
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
		height: "100%",
		padding: 12,
	},
	input: {
		backgroundColor: colors.appBack,
	},
	inputContainer: {
		flexGrow: 1,
		flex: 1,
	},
	characterCount: {
		marginTop: 10,
		fontSize: 15,
		alignSelf: "center",
	},
	characterCountLabel: {
		color: colors.medium,
	},
	characterCountValue: {
		fontWeight: "700",
	},
	goodOrBad: {
		marginVertical: 15,
		marginHorizontal: 7,
	},
});

export default AnswerModal;
