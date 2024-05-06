import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import NettText from "./Text";

function BinarySelector({ left, right, onSelectionChange, style }) {
	const [selection, setSelection] = useState(left);

	useEffect(() => {
		onSelectionChange && onSelectionChange(selection);
	}, [selection]);

	return (
		<View style={[styles.container, style]}>
			<TouchableOpacity
				style={[
					styles.option,
					styles.left,
					selection === left && styles.selected,
				]}
				onPress={() => setSelection(left)}
			>
				<NettText
					style={[styles.text, selection === left && styles.textSelected]}
				>
					{left}
				</NettText>
			</TouchableOpacity>
			<TouchableOpacity
				style={[
					styles.option,
					styles.right,
					selection === right && styles.selected,
				]}
				onPress={() => setSelection(right)}
			>
				<NettText
					style={[styles.text, selection === right && styles.textSelected]}
				>
					{right}
				</NettText>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		backgroundColor: colors.lighter,
		borderRadius: 12,
	},
	option: {
		flex: 1,
		padding: 17,
	},
	selected: {
		backgroundColor: colors.appPrimary,
		color: colors.white,
	},
	left: {
		borderTopStartRadius: 12,
		borderBottomStartRadius: 12,
	},
	right: {
		borderTopEndRadius: 12,
		borderBottomEndRadius: 12,
	},
	text: {
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 15,
		color: colors.medium,
	},
	textSelected: {
		color: colors.white,
	},
});

export default BinarySelector;
