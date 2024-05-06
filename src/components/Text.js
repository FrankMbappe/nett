import React from "react";
import { Text } from "react-native";
import colors from "../config/colors";

function NettText({ children, style, ...otherProps }) {
	return (
		<Text
			style={[{ color: colors.appFront, fontSize: 14 }, style]}
			{...otherProps}
		>
			{children}
		</Text>
	);
}

export default NettText;
