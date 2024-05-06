import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { ListItem } from "../lists";

import colors from "../../config/colors";

function ListItemSelector({
	onSelectOption,
	selectedOption,
	selectedStyle,
	style,

	flatListKey = "key",
	imageIsRounded = false,
	options = [],
}) {
	return (
		<View style={[styles.selector, style]}>
			<FlatList
				data={options}
				keyExtractor={(item) => String(item[flatListKey])}
				renderItem={({ item }) => (
					<ListItem
						description={item.description}
						image={item.image}
						imageIsRounded={imageIsRounded}
						name={item.name}
						onPress={() => onSelectOption(item)}
						style={[
							styles.option,
							selectedOption &&
								item.key === selectedOption.key &&
								(selectedStyle ?? styles.optionSelected),
						]}
					/>
				)}
				style={styles.flatList}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	selector: {
		width: "100%",
	},
	option: {
		padding: 19,
		borderColor: colors.light,
		borderWidth: 2,
		marginBottom: 10,
	},
	optionSelected: {
		backgroundColor: colors.light,
	},
});

export default ListItemSelector;
