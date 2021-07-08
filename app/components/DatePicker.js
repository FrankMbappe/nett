import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

import colors from "../config/colors";
import NettText from "./Text";

function DatePicker({ containerStyle, style, label = "Date", fontSize = 20 }) {
	const [date, setDate] = useState(new Date());
	const [show, setShow] = useState(false);

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShow(Platform.OS === "ios");
		setDate(currentDate);
	};

	const showPicker = () => setShow(true);

	return (
		<>
			<TouchableOpacity
				onPress={showPicker}
				style={[styles.container, { padding: fontSize * 0.75 }, containerStyle]}
			>
				<NettText style={[{ flex: 1, fontSize }, style]}>
					{`${label}: ${date.toLocaleDateString()}`}
				</NettText>

				<MaterialCommunityIcons
					name="calendar-month"
					size={fontSize * 1.5}
					color={colors.appFront}
				/>
			</TouchableOpacity>

			{show && (
				<DateTimePicker
					testID="dateTimePicker"
					value={date}
					mode="date"
					display="spinner"
					onChange={onChange}
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
