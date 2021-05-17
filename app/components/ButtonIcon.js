import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Badge from "./Badge";

import colors from "../config/colors";
import NettText from "./Text";

function ButtonIcon({
	badge,
	disabled,
	containerStyle,
	size = 25,
	text,
	textStyle,
	...otherProps
}) {
	return (
		<TouchableOpacity
			disabled={disabled}
			style={[styles(disabled).container, containerStyle]}
			onPress={otherProps.onPress}
		>
			<>
				{!disabled && badge && <Badge size={size} style={styles().badge} />}
				<MaterialCommunityIcons
					size={size}
					color={colors.appFront}
					{...otherProps}
				/>
			</>
			{text && (
				<NettText style={[textStyle, { marginStart: 5 }]}>{text}</NettText>
			)}
		</TouchableOpacity>
	);
}

const styles = (disabled = false) => {
	return StyleSheet.create({
		badge: {
			position: "absolute",
			top: 3,
			end: 3,
			zIndex: 1,
		},
		container: {
			justifyContent: "center",
			flexDirection: "row",
			alignItems: "center",
			padding: 5,
			borderRadius: 3,
			opacity: disabled ? 0.25 : 1,
		},
	});
};

export default ButtonIcon;
