import React from "react";
import { View, StyleSheet } from "react-native";
import ListItem from "../ListItem";
import colors from "../../config/colors";

function ListItemSelector({ style, options }) {
	return (
		<View style={[styles.selector, style]}>
			{options.map(
				({ image, name, description, imageIsRounded = false }, key) => (
					<ListItem
						style={styles.item}
						image={image}
						name={name}
						description={description}
						imageIsRounded={imageIsRounded}
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
		borderColor: colors.grey,
		borderWidth: 2,
	},
});

export default ListItemSelector;
