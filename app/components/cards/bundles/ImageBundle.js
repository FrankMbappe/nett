import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../../config/colors";
import FastImage from "react-native-fast-image";

import ButtonIcon from "../../ButtonIcon";

function ImageBundle({ uri }) {
	return (
		<View style={styles.container}>
			<FastImage
				style={{ width: "100%", height: 250 }}
				source={{ uri: uri }}
				resizeMode={FastImage.resizeMode.contain}
			/>
			<ButtonIcon
				name="arrow-expand-all"
				color="white"
				size={30}
				containerStyle={styles.expandButton}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 10,
		backgroundColor: colors.mediumLight,
	},
	expandButton: {
		position: "absolute",
		bottom: 10,
		end: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.5,
		shadowRadius: 6.27,

		elevation: 10,
	},
});

export default ImageBundle;
