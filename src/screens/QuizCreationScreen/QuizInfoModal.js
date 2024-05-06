import { isAfter } from "date-fns";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import NettButton from "../../components/Button";
import ButtonIcon from "../../components/ButtonIcon";
import DatePicker from "../../components/DatePicker";
import Label from "../../components/Label";
import ShortModal from "../../components/ShortModal";
import NettSwitch from "../../components/Switch";
import NettText from "../../components/Text";
import colors from "../../config/colors";

function QuizInfoModal({ isVisible, onTapOutside, onSubmit }) {
	// States
	const [hasTimeInterval, setHasTimeInterval] = useState(false);
	const [isDeterministic, setIsDeterministic] = useState(false);
	const [dateOpening, setDateOpening] = useState(new Date());
	const [dateClosing, setDateClosing] = useState(new Date());

	// Action handlers
	const handleOnShow = () => {
		setHasTimeInterval(false);
		setIsDeterministic(false);
		setDateOpening(new Date());
		setDateClosing(new Date());
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
					<Label style={styles.label} value="🛠 Additional options" />

					{/* Close button */}
					<ButtonIcon
						name="close"
						containerStyle={styles.modalCloseButton}
						size={15}
						onPress={onTapOutside}
					/>
				</View>

				<View style={styles.optionContainer}>
					<NettSwitch
						text="Apply a time interval"
						description="Specify a date at which your quiz will be opened and closed."
						onToggleSwitch={(value) => setHasTimeInterval(value)}
					/>
					{hasTimeInterval && (
						<View style={styles.datePickers}>
							<DatePicker
								label="Opens"
								dateValue={dateOpening}
								onChangeDate={(date) => setDateOpening(date)}
								pickTime
							/>
							<DatePicker
								label="Closes"
								containerStyle={{ marginTop: 10 }}
								dateValue={dateClosing}
								onChangeDate={(date) => setDateClosing(date)}
								pickTime
							/>
						</View>
					)}
					<NettSwitch
						containerStyle={{ marginTop: 10 }}
						text="Deterministic"
						description="Allow your students to know if they are right after completing each QA."
						onToggleSwitch={(value) => setIsDeterministic(value)}
					/>
				</View>

				{/* Submit button */}
				<NettButton
					text="Submit"
					disabled={hasTimeInterval && isAfter(dateOpening, dateClosing)}
					onPress={() =>
						onSubmit &&
						onSubmit({
							isDeterministic,
							hasTimeInterval,
							dateOpening,
							dateClosing,
						})
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
	optionContainer: {
		flex: 1,
	},
	selector: {
		marginVertical: 10,
	},
	optionDescription: {
		fontSize: 15,
		color: colors.medium,
		textAlign: "center",
		marginTop: 10,
	},
	datePickers: {
		marginVertical: 5,
	},
});

export default QuizInfoModal;
