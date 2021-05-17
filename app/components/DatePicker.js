import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import NettText from "./Text";

function DatePicker({ containerStyle, style, fontSize = 20, ...otherProps }) {
	const [date, setDate] = useState();
	return (
		<TouchableOpacity
			onPress={() => console.log("DatePicker triggered")}
			style={[styles.container, { padding: fontSize * 0.75 }, containerStyle]}
		>
			<NettText style={[{ flex: 1, fontSize }, style]} {...otherProps}>
				{date ?? "Date of birth"}
			</NettText>

			<MaterialCommunityIcons
				name="calendar-month"
				size={fontSize * 1.5}
				color={colors.appFront}
			/>
		</TouchableOpacity>
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
