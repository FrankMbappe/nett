import React from "react";
import { View, StyleSheet } from "react-native";
import ListItem from "../ListItem";

function ListItemSelector({ style, options }) {
	return (
		<View style={[styles.selector, style]}>
			{options.map(({ icon, name, description }, key) => (
				<ListItem icon={icon} name={name} description={description} />
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	selector: {},
});

export default ListItemSelector;
