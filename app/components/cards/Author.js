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
}) {
	return (
		<View style={style}>
			<Divider style={styles.divider} />
			<View style={styles(fontSize).infoContainer}>
				<Image style={styles(fontSize).pic} source={picUri} />
				<NettText style={styles(fontSize).name} numberOfLines={1}>
					{name + `${classroomName ? `  >  ${classroomName}` : ""}`}
				</NettText>
			</View>
		</View>
	);
}

const styles = (fontSize) =>
	StyleSheet.create({
		divider: {
			backgroundColor: colors.mediumLight,
			width: "100%",
		},
		infoContainer: {
			flexDirection: "row",
			alignItems: "center",
			marginTop: fontSize * (2 / 3),
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
