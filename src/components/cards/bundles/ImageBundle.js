import React from "react";
import { View, StyleSheet, Image } from "react-native";
import colors from "../../../config/colors";

import ButtonIcon from "../../ButtonIcon";
import { screens } from "../../../navigation/routes";

function ImageBundle({ uri, navigation }) {
	return (
		<View style={styles.container}>
			<Image
				style={{ width: "100%", height: 250 }}
				source={{ uri }}
				tint="light"
			/>
			<ButtonIcon
				name="arrow-expand-all"
				color="white"
				size={30}
				onPress={() =>
					navigation && navigation.navigate(screens.ImagePreview, { uri })
				}
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
