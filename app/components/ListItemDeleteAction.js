import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";

import colors from "../config/colors";

function ListItemDeleteAction({ onPress }) {
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View style={styles.container}>
				<MaterialCommunityIcons
					name="trash-can"
					size={35}
					color={colors.white}
				/>
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.danger,
		alignItems: "center",
		justifyContent: "center",
		width: 70,
	},
});

export default ListItemDeleteAction;
