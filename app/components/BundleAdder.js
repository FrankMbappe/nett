import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";
import ButtonIcon from "./ButtonIcon";
import NettText from "./Text";

function BundleAdder({
	containerStyle,
	isExpanded = true,
	onPressBundle,
	onPressMention,
	onPressMedia,
	onPressFile,
	onPressTutorial,
	onPressQuiz,
}) {
	return (
		<View style={[styles.container, containerStyle]}>
			<View style={styles.header}>
				<NettText style={styles.title}>{"Bundle to your post"}</NettText>
				{isExpanded && (
					<View style={styles.horizontalContainer}>
						<ButtonIcon
							name="pen"
							color={colors.appPrimary}
							onPress={() => {
								onPressBundle();
								onPressMention();
							}}
						/>
						<ButtonIcon
							name="pen"
							color={colors.ok}
							onPress={() => {
								onPressBundle();
								onPressMedia();
							}}
						/>
						<ButtonIcon
							name="pen"
							color={colors.optimal}
							onPress={() => {
								onPressBundle();
								onPressFile();
							}}
						/>
						<ButtonIcon
							name="pen"
							color={colors.danger}
							onPress={() => {
								onPressBundle();
								onPressTutorial();
							}}
						/>
						<ButtonIcon
							name="pen"
							color={colors.warning}
							onPress={() => {
								onPressBundle();
								onPressQuiz();
							}}
						/>
					</View>
				)}
			</View>
			{!isExpanded && (
				<View style={styles.verticalContainer}>
					<View />
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {},
	title: {
		flex: 1,
		fontWeight: "bold",
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
	},
	horizontalContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	verticalContainer: {
		justifyContent: "space-between",
	},
});

export default BundleAdder;
