import React from "react";
import { View } from "react-native";

import colors from "../config/colors";

function Badge({ style, size = 25, color = colors.danger }) {
	return (
		<View
			style={[
				{
					backgroundColor: color,
					width: size * 0.5,
					height: size * 0.5,
					borderColor: colors.appBack,
					borderRadius: size * 0.225,
					borderWidth: 2,
				},
				style,
			]}
		/>
	);
}

export default Badge;
