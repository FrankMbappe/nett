import React from "react";
import { TouchableOpacity, Image, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

function NettImagePicker({ style, size = 150, onPress }) {
	return (
		<TouchableOpacity style={[styles(size).container, style]} onPress={onPress}>
			<Image style={styles(size).image} />
			<View style={styles(size).overlay}>
				<MaterialCommunityIcons
					name={"camera"}
					color={colors.white}
					size={size / 3}
				/>
			</View>
		</TouchableOpacity>
	);
}

const styles = (size) =>
	StyleSheet.create({
		container: {
			width: size,
			height: size,
			borderRadius: size / 2,
		},
		overlay: {
			width: "100%",
			height: "100%",
			position: "absolute",
			borderRadius: size / 2,
			backgroundColor: "#00000080",
			alignItems: "center",
			justifyContent: "center",
		},
		image: {
			width: "100%",
			height: "100%",
			position: "absolute",
			borderRadius: size / 2,
		},
	});

export default NettImagePicker;
