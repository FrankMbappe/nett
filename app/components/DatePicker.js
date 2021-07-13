import React, { useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

import colors from "../config/colors";
import NettText from "./Text";
import { formatISO, parseISO } from "date-fns";
import format from "date-fns/format";

function DatePicker({
	containerStyle,
	style,
	onChangeDate,
	onPress,
	label = "Date",
	pickTime = false,
	fontSize = 20,
	dateValue = new Date(),
	dateDisplay = "default",
	timeDisplay = "default",
}) {
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [showTimePicker, setShowTimePicker] = useState(false);
	const date = useRef(dateValue);

	const onChangeDateValue = (event, selectedDate) => {
		if (selectedDate !== undefined) {
			// I set the current date to the selected one
			date.current = selectedDate ? selectedDate : dateValue;

			// I update the date directly
			setShowDatePicker(Platform.OS === "ios");
			onChangeDate(date.current);

			// If pick time, I pass the control to the time picker
			if (pickTime) return setShowTimePicker(true);
		}
	};
	const onChangeTimeValue = (event, selectedTime) => {
		// I combine selected time and date
		const newDate = formatISO(date.current, { representation: "date" });
		const newTime = formatISO(selectedTime, { representation: "time" });
		date.current = parseISO(`${newDate}T${newTime}`);

		// Then I set it
		setShowTimePicker(Platform.OS === "ios");
		onChangeDate(date.current);
	};
	const showPicker = () => setShowDatePicker(true);

	return (
		<>
			<TouchableOpacity
				onPress={() => {
					showPicker();
					onPress && onPress();
				}}
				style={[styles.container, { padding: fontSize * 0.75 }, containerStyle]}
			>
				<NettText style={[{ flex: 1, fontSize }, style]}>
					{`${label}: ${format(
						date.current,
						pickTime ? "dd/MM/yyyy h:mm a" : "dd-MM-yyyy"
					)}`}
				</NettText>

				<MaterialCommunityIcons
					name="calendar-month"
					size={fontSize * 1.5}
					color={colors.appFront}
				/>
			</TouchableOpacity>

			{showDatePicker && (
				<DateTimePicker
					testID="datePicker"
					value={dateValue}
					mode="date"
					display={dateDisplay}
					onChange={onChangeDateValue}
				/>
			)}
			{showTimePicker && (
				<DateTimePicker
					testID="timePicker"
					value={dateValue}
					mode="time"
					display={timeDisplay}
					onChange={onChangeTimeValue}
				/>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.appBack,
		borderRadius: 15,
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 2,
		borderColor: colors.light,
	},
});

export default DatePicker;
