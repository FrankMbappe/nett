import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import colors from "../../config/colors";
import NettText from "../NettText";

function NettFormErrorLabel({ style, error, visible }) {
	if (!visible || !error) {
		return null;
	}
	return (
		<View style={[{ flexDirection: "row", alignItems: "center" }, style]}>
			<MaterialCommunityIcons
				name="alert-circle"
				size={20}
				color={colors.danger}
			/>
			<NettText style={{ marginStart: 10, color: colors.danger }}>
				{error}
			</NettText>
		</View>
	);
}

export default NettFormErrorLabel;
