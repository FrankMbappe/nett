import React from "react";
import { TextInput, StyleSheet, Image, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

function NettTextInput({ style, icon, fontSize = 20, ...otherProps }) {
	return (
		<View style={[styles.container, { padding: fontSize * 0.75 }, style]}>
			{icon && (
				<MaterialCommunityIcons
					name={icon}
					size={fontSize * 1.67}
					color={colors.medium}
					style={{ marginEnd: fontSize * 0.65 }}
				/>
			)}
			<TextInput style={[{ width: "100%", fontSize }, style]} {...otherProps} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.light,
		borderRadius: 15,
		flexDirection: "row",
		width: "100%",
	},
});

export default NettTextInput;
