import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import ButtonIcon from "./ButtonIcon";
import TextIcon from "./TextIcon";

function SectionHeader({
	containerStyle,
	icon,
	onExpansion,
	title,
	expand = false,
	fontSize = 18,
}) {
	return (
		<View style={[styles.container, containerStyle]}>
			<TextIcon
				containerStyle={{ flex: 1 }}
				fontSize={fontSize}
				icon={icon}
				text={title}
				style={styles.title}
			/>
			{expand && (
				<ButtonIcon
					name="arrow-right"
					size={fontSize * 1.5}
					onPress={onExpansion}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flexDirection: "row",
		paddingHorizontal: 7,
		paddingVertical: 10,
		width: "100%",
	},
	title: {
		fontWeight: "bold",
	},
});

export default SectionHeader;
