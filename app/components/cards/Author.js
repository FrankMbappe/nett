import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Divider } from "react-native-elements";

import NettText from "../Text";

import colors from "../../config/colors";
import images from "../../config/images";

function Author({
	name,
	style,
	classroomName,
	fontSize = 12,
	picUri = images.USER_DEFAULT,
	dividerAtTop = true,
	dividerAtBottom = false,
}) {
	return (
		<View style={style}>
			{dividerAtTop && (
				<Divider style={[styles().divider, styles(fontSize).dividerAtTop]} />
			)}
			<View style={styles(fontSize).infoContainer}>
				<Image style={styles(fontSize).pic} source={picUri} />
				<NettText style={styles(fontSize).name} numberOfLines={1}>
					{name + `${classroomName ? `  >  ${classroomName}` : ""}`}
				</NettText>
			</View>
			{dividerAtBottom && (
				<Divider style={[styles().divider, styles(fontSize).dividerAtBottom]} />
			)}
		</View>
	);
}

const styles = (fontSize) =>
	StyleSheet.create({
		divider: {
			backgroundColor: colors.mediumLight,
			width: "100%",
		},
		dividerAtTop: {
			marginBottom: fontSize * (2 / 3),
		},
		dividerAtBottom: {
			marginTop: fontSize * (2 / 3),
		},
		infoContainer: {
			flexDirection: "row",
			alignItems: "center",
		},
		name: {
			flex: 1,
			fontSize: fontSize,
			fontWeight: "bold",
		},
		pic: {
			width: fontSize * 1.5,
			height: fontSize * 1.5,
			borderRadius: fontSize * 0.75,
			marginEnd: fontSize * 0.5,
		},
	});

export default Author;
