import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

const IMAGE_SIZE = { width: 50, height: 50 };

function ListItem({ style, image, name, description, imageIsRounded = false }) {
	return (
		<TouchableOpacity style={[styles.card, style]}>
			<Image
				style={[
					styles.image,
					{ borderRadius: imageIsRounded ? IMAGE_SIZE.width : 0 },
				]}
				source={image}
			/>
			<View style={styles.descriptionContainer}>
				<Text style={styles.name}>{name}</Text>
				<Text style={styles.description}>{description}</Text>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	card: {
		padding: 15,
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 15,
		marginBottom: 10,
		width: "100%",
	},
	description: {
		fontSize: 13,
		paddingTop: 3,
		opacity: 0.75,
	},
	descriptionContainer: {
		flex: 1,
		marginStart: 20,
	},
	image: {
		width: IMAGE_SIZE.width,
		height: IMAGE_SIZE.height,
	},
	name: {
		fontSize: 19,
		fontWeight: "bold",
	},
});

export default ListItem;
