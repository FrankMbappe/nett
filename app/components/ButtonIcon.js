import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

function ButtonIcon({
	badge,
	disabled,
	containerStyle,
	size = 25,
	...otherProps
}) {
	return (
		<TouchableOpacity
			disabled={disabled}
			style={[styles(size, disabled).container, containerStyle]}
			onPress={otherProps.onPress}
		>
			{!disabled && badge && <View style={styles(size).badge} />}
			<MaterialCommunityIcons
				size={size}
				color={colors.appFront}
				{...otherProps}
			/>
		</TouchableOpacity>
	);
}

const styles = (size, disabled = false) => {
	return StyleSheet.create({
		badge: {
			position: "absolute",
			backgroundColor: colors.danger,
			width: size * 0.5,
			height: size * 0.5,
			borderColor: colors.appBack,
			borderRadius: size * 0.225,
			top: 3,
			end: 3,
			borderWidth: 2,
			zIndex: 1,
		},
		container: {
			backgroundColor: colors.appBack,
			justifyContent: "center",
			alignItems: "center",
			padding: 5,
			borderRadius: 3,
			opacity: disabled ? 0.25 : 1,
		},
	});
};

export default ButtonIcon;
