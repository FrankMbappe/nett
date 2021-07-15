import React from "react";
import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import colors from "../config/colors";
import NettText from "./Text";
import { useNetInfo } from "@react-native-community/netinfo";

function OfflineNotice(props) {
	const netInfo = useNetInfo();

	if (netInfo.type !== "unknown" && netInfo.isInternetReachable === false)
		return (
			<View style={styles.container}>
				<NettText style={styles.text}>No internet connection</NettText>
			</View>
		);

	return null;
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		backgroundColor: colors.appPrimary,
		height: 50,
		justifyContent: "center",
		top: Constants.statusBarHeight,
		position: "absolute",
		width: "100%",
		zIndex: 1,
	},
	text: {
		color: colors.white,
	},
});

export default OfflineNotice;
