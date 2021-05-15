import React from "react";
import { View, StyleSheet } from "react-native";
import { ListItem } from "../lists";

import colors from "../../config/colors";

function ListItemSelector({ style, options }) {
	return (
		<View style={[styles.selector, style]}>
			{options.map(
				({ image, name, description, imageIsRounded = false }, key) => (
					<ListItem
						key={key}
						style={styles.item}
						image={image}
						name={name}
						description={description}
						imageIsRounded={imageIsRounded}
						onPress={() => console.log(`Type ${key} selected.`)}
					/>
				)
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	selector: {
		width: "100%",
	},
	item: {
		padding: 19,
		borderColor: colors.light,
		borderWidth: 2,
		marginBottom: 10,
	},
});

export default ListItemSelector;
