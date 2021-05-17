import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../../config/colors";
import { bytesToSize } from "../../../utils";
import NettText from "../../Text";
import TextIcon from "../../TextIcon";

function FileBundle({ file: { name, extension, size } }) {
	return (
		<TouchableOpacity style={styles.container}>
			<TextIcon icon="pin" text="File" color={colors.medium} fontSize={11} />

			<View style={styles.descriptionContainer}>
				<View style={styles.extensionLabel}>
					<NettText style={styles.extension} numberOfLines={1}>
						{extension}
					</NettText>
				</View>

				<View style={{ flex: 1 }}>
					<NettText style={styles.name} numberOfLines={2}>
						{name}
					</NettText>

					<NettText style={{ fontSize: 12 }} numberOfLines={1}>
						{`${extension.toUpperCase()} File | ${bytesToSize(size)}`}
					</NettText>
				</View>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.light,
		borderRadius: 10,
		elevation: 3,
		height: 100,
		margin: 15,
		marginBottom: 5,
		maxWidth: 330,
		paddingHorizontal: 12,
		paddingVertical: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
	},
	descriptionContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
	},
	extension: {
		fontWeight: "bold",
		textTransform: "uppercase",
		color: colors.white,
	},
	extensionLabel: {
		alignItems: "center",
		backgroundColor: colors.danger,
		height: "90%",
		justifyContent: "center",
		marginEnd: 10,
		borderRadius: 5,
		width: 50,
	},
	name: { fontSize: 16, fontWeight: "bold" },
});

export default FileBundle;
