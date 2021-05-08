import React from "react";
import {
	TouchableOpacity,
	TouchableHighlight,
	Image,
	View,
	StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import images from "../config/images";

function NettImagePicker({ style, size = 150, onPicPress, onPicChangerPress }) {
	return (
		<View style={[styles(size).container, style]} onPress={onPicPress}>
			<TouchableOpacity style={styles(size).imageContainer}>
				<Image style={styles(size).image} source={images.USER_DEFAULT} />
			</TouchableOpacity>
			<TouchableHighlight
				underlayColor={colors.appPrimaryDark}
				style={styles(size).picChanger}
				onPress={onPicChangerPress}
			>
				<MaterialCommunityIcons
					name={"camera"}
					color={colors.white}
					size={size * 0.12}
				/>
			</TouchableHighlight>
		</View>
	);
}

const styles = (size) =>
	StyleSheet.create({
		container: {
			width: size,
			height: size,
			borderRadius: size / 2,
		},
		picChanger: {
			alignItems: "center",
			backgroundColor: colors.appPrimary,
			borderRadius: size * 0.12,
			bottom: 0,
			end: size * 0.04,
			height: size * 0.24,
			justifyContent: "center",
			position: "absolute",
			width: size * 0.24,
		},
		image: {
			width: "100%",
			height: "100%",
			borderRadius: size / 2,
		},
		imageContainer: {
			width: "100%",
			height: "100%",
			position: "absolute",
		},
	});

export default NettImagePicker;
