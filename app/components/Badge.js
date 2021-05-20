import React from "react";
import { View } from "react-native";

import colors from "../config/colors";

function Badge({ style, size = 25, color = colors.danger, useBorders = true }) {
	return (
		<View
			style={[
				{
					backgroundColor: color,
					width: size * 0.5,
					height: size * 0.5,
					borderColor: colors.appBack,
					borderRadius: size * 0.225,
					borderWidth: useBorders ? 2 : 0,
				},
				style,
			]}
		/>
	);
}

export default Badge;
