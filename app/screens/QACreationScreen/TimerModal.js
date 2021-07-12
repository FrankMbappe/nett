import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import NettButton from "../../components/Button";
import ButtonIcon from "../../components/ButtonIcon";
import Label from "../../components/Label";
import Selector from "../../components/Selector";
import ShortModal from "../../components/ShortModal";
import NettText from "../../components/Text";
import colors from "../../config/colors";

function TimerModal({
	timerValue,
	isVisible,
	onTapOutside,
	onSubmit,
	timerList = [],
}) {
	// States
	const [timer, setTimer] = useState();

	// Action handlers
	const handleSelectionChange = (index) => {
		if (Number.isInteger(index)) setTimer(timerList[index]);
	};
	const handleOnShow = () => {
		setTimer(timerValue);
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
					<Label style={styles.label} value="⏲ Timer" />

					{/* Close button */}
					<ButtonIcon
						name="close"
						containerStyle={styles.modalCloseButton}
						size={15}
						onPress={onTapOutside}
					/>
				</View>

				<View style={styles.selectorContainer}>
					<NettText style={styles.description}>Select a timer value</NettText>
					<Selector
						containerStyle={styles.selector}
						items={timerList}
						selected={timerList.indexOf(timerValue)}
						onSelectionChange={(index) => handleSelectionChange(index)}
					/>
				</View>

				{/* Submit button */}
				<NettButton
					text="Submit"
					disabled={!timer}
					onPress={() => onSubmit && onSubmit(timer)}
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
	description: {
		fontSize: 14,
		color: colors.medium,
		alignSelf: "center",
	},
	selectorContainer: {
		flex: 1,
	},
	selector: {
		marginVertical: 10,
	},
});

export default TimerModal;
