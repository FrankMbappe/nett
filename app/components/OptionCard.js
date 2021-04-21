import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import colors from "../config/colors";

function OptionCard({ style, icon, name, description }) {
	return (
		<TouchableOpacity style={[styles.card, style]}>
			<Image style={styles.icon} source={icon} />
			<View style={styles.descriptionContainer}>
				<Text style={styles.name}>{name}</Text>
				<Text style={styles.description}>{description}</Text>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	card: {
		padding: 19,
		flexDirection: "row",
		borderColor: colors.grey,
		borderWidth: 2,
		borderRadius: 15,
		marginBottom: 10,
	},
	description: {
		fontSize: 11,
	},
	descriptionContainer: {
		flex: 1,
		marginStart: 20,
	},
	icon: {
		width: 50,
		height: 50,
	},
	name: {
		fontSize: 19,
		fontWeight: "bold",
	},
});

export default OptionCard;
