import React from "react";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Icon({
	name,
	size = 40,
	backgroundColor = "grey",
	iconColor = "white",
}) {
	return (
		<View
			style={{
				width: size,
				height: size,
				backgroundColor,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<MaterialCommunityIcons name={name} color={iconColor} size={size / 2} />
		</View>
	);
}

export default Icon;
