import React, { useMemo } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import colors from "../config/colors";
import ButtonIcon from "./ButtonIcon";
import Icon from "./Icon";
import NettText from "./Text";

function BundleAdder({
	containerStyle,
	isExpanded = true,
	onPressAdder,
	onPressImage,
	onPressVideo,
	onPressFile,
	onPressTutorial,
	onPressQuiz,
}) {
	const adders = useMemo(
		() => [
			{
				name: "Image",
				icon: "image-filter-vintage",
				color: colors.ok,
				onPress: onPressImage,
			},
			{
				name: "Video",
				icon: "video",
				color: colors.electric,
				onPress: onPressVideo,
			},
			{
				name: "File",
				icon: "file",
				color: colors.warning,
				onPress: onPressFile,
			},
			{
				name: "Tutorial",
				icon: "animation-play",
				color: colors.danger,
				onPress: onPressTutorial,
			},
			{
				name: "Quiz",
				icon: "format-list-bulleted-square",
				color: colors.optimal,
				onPress: onPressQuiz,
			},
		],
		[onPressImage, onPressVideo, onPressFile, onPressTutorial, onPressQuiz]
	);

	return (
		<View style={[styles.container, containerStyle]}>
			<View style={styles.header}>
				<NettText style={styles.title}>{"Bundle to your post"}</NettText>
				{!isExpanded && (
					<View style={styles.unexpandedContainer}>
						{adders.map((x, index) => (
							<ButtonIcon
								key={String(index)}
								name={x.icon}
								color={x.color}
								onPress={() => {
									onPressAdder();
									x.onPress();
								}}
							/>
						))}
					</View>
				)}
			</View>

			{isExpanded && (
				<View style={styles.expandedContainer}>
					{adders.map((x, index) => (
						<Pressable
							key={String(index)}
							style={styles.expandedIcon}
							onPress={() => {
								onPressAdder();
								x.onPress();
							}}
						>
							<Icon
								name={x.icon}
								size={60}
								iconColor={colors.white}
								backgroundColor={x.color}
							/>
							<NettText style={styles.bundleName}>{x.name}</NettText>
						</Pressable>
					))}
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
	unexpandedContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	expandedContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 10,
		marginBottom: 10,
	},
	expandedIcon: {
		alignItems: "center",
	},
	bundleName: {
		fontSize: 11,
		marginTop: 3,
		fontWeight: "700",
	},
});

export default BundleAdder;
