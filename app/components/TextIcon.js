import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NettText from "./Text";
import colors from "../config/colors";

function TextIcon({
	containerStyle,
	icon,
	text,
	spacing,
	color = colors.appFront,
	fontSize = 14,
	...otherProps
}) {
	return (
		<View style={[styles.container, containerStyle]}>
			<MaterialCommunityIcons
				name={icon}
				size={fontSize * 1.5}
				color={color}
				style={{ marginEnd: spacing ?? fontSize * 0.4 }}
			/>
			<NettText
				{...otherProps}
				style={[otherProps.style, { fontSize, color }]}
				numberOfLines={1}
			>
				{text}
			</NettText>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
	},
});

export default TextIcon;
