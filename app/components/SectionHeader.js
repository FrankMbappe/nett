import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import NettText from "./Text";
import TextIcon from "./TextIcon";

function SectionHeader({
	containerStyle,
	icon,
	title,
	endLinkText,
	onPressEndlink,
}) {
	return (
		<View style={[styles.container, containerStyle]}>
			<TextIcon
				containerStyle={{ flex: 1 }}
				fontSize={19}
				icon={icon}
				text={title}
				style={styles.title}
			/>
			{endLinkText && (
				<TouchableOpacity onPress={onPressEndlink}>
					<NettText style={styles.endLinkText}>{endLinkText}</NettText>
				</TouchableOpacity>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flexDirection: "row",
		paddingHorizontal: 7,
		paddingVertical: 10,
		width: "100%",
	},
	endLinkText: {
		color: colors.appPrimary,
		fontSize: 17,
		fontWeight: "400",
	},
	title: {
		fontWeight: "bold",
	},
});

export default SectionHeader;
