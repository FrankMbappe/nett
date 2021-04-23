import React from "react";
import { View, StyleSheet } from "react-native";

import colors from "../config/colors";

function ListItemSeparator({ style }) {
	return <View style={[styles.separator, style]} />;
}

const styles = StyleSheet.create({
	separator: {
		width: "90%",
		height: 2,
		backgroundColor: colors.light,
		alignSelf: "center",
	},
});

export default ListItemSeparator;
