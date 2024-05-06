import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";
import NettText from "./Text";

function Selector({ containerStyle, selected, onSelectionChange, items = [] }) {
	// States
	const [selectedIndex, setSelectedIndex] = useState(selected);

	// Action handlers
	const handleSelection = (index) => {
		setSelectedIndex(index);
		onSelectionChange(index);
	};

	return (
		<View style={[styles.container, containerStyle]}>
			{items.map((item, index) => (
				<NettText
					key={String(index)}
					style={[styles.item, selectedIndex === index && styles.selectedItem]}
					onPress={() => handleSelection(index)}
				>
					{item}
				</NettText>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		flexWrap: "wrap",
	},
	item: {
		fontSize: 25,
		fontWeight: "bold",
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 12,
		margin: 5,
		backgroundColor: colors.lighter,
	},
	selectedItem: {
		backgroundColor: colors.optimalLight,
	},
});

export default Selector;
