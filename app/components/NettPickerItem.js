import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import NettText from "./NettText";

function NettPickerItem({ label, onPress }) {
	return (
		<TouchableOpacity style={styles.container} onPress={onPress}>
			<NettText style={styles.text}>{label}</NettText>
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
