import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import NettText from "./Text";

function NettPickerItem({ label, onPress, style }) {
	return (
		<TouchableOpacity style={[styles.container, style]} onPress={onPress}>
			<NettText style={styles.text} numberOfLines={1}>
				{label}
			</NettText>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		borderColor: "red",
		borderWidth: 0,
	},
	text: {
		fontSize: 18,
		fontWeight: "500",
	},
});

export default NettPickerItem;
