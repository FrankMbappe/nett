import React from "react";
import {
	StyleSheet,
	Modal,
	KeyboardAvoidingView,
	View,
	TouchableWithoutFeedback,
} from "react-native";
import colors from "../config/colors";

function ShortModal({ children, onRequestClose, ...otherProps }) {
	return (
		<Modal
			animationType="slide"
			onRequestClose={onRequestClose}
			transparent
			{...otherProps}
		>
			<TouchableWithoutFeedback onPress={onRequestClose}>
				<View style={styles.outside} />
			</TouchableWithoutFeedback>
			<KeyboardAvoidingView style={styles.container}>
				{children}
			</KeyboardAvoidingView>
		</Modal>
	);
}

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		width: "100%",
		minHeight: 250,
		bottom: 0,
		backgroundColor: colors.appBack,
		borderTopStartRadius: 25,
		borderTopEndRadius: 25,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 12,
		},
		shadowOpacity: 0.85,
		shadowRadius: 16.16,

		elevation: 20,
	},
	outside: {
		flex: 1,
		backgroundColor: colors.quiteTransparentDark,
	},
});

export default ShortModal;
