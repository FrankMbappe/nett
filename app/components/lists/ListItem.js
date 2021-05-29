import React from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import NettText from "../Text";

import colors from "../../config/colors";

function ListItem({
	style,
	fontSize = 18,
	imageIsRounded = false,
	...otherProps
}) {
	return (
		<Swipeable
			renderRightActions={otherProps.renderRightActions}
			renderLeftActions={otherProps.renderLeftActions}
		>
			<TouchableHighlight
				underlayColor={colors.lighter}
				onPress={otherProps.onPress}
				style={[styles(fontSize).card, style]}
			>
				<>
					{otherProps.ImageComponent /* e.g., an Icon component */ ||
						/*Basic tip in react to display a component only if a certain value is not null*/
						(otherProps.image && (
							<Image
								style={[
									styles(fontSize).image,
									{
										borderRadius: imageIsRounded ? fontSize * 1.75 : 0,
									},
								]}
								source={otherProps.image}
							/>
						))}

					<View style={styles(fontSize).descriptionContainer}>
						<NettText style={styles(fontSize).name} numberOfLines={1}>
							{otherProps.name}
						</NettText>
						{otherProps.description && (
							<NettText style={styles(fontSize).description} numberOfLines={2}>
								{otherProps.description}
							</NettText>
						)}
					</View>

					{otherProps.usesChevron && (
						<MaterialCommunityIcons
							name="chevron-right"
							size={20}
							color={colors.medium}
						/>
					)}
				</>
			</TouchableHighlight>
		</Swipeable>
	);
}

const styles = (fontSize) =>
	StyleSheet.create({
		card: {
			padding: fontSize * 0.84,
			flexDirection: "row",
			alignItems: "center",
			borderRadius: fontSize * 0.84,
			width: "100%",
		},
		description: {
			fontSize: fontSize * 0.75,
			paddingTop: 2,
			opacity: 0.75,
		},
		descriptionContainer: {
			flex: 1,
			marginStart: fontSize * 1.05,
			justifyContent: "center",
		},
		image: {
			width: fontSize * 3.5,
			height: fontSize * 3.5,
		},
		name: {
			fontSize: fontSize,
			fontWeight: "bold",
		},
	});

export default ListItem;
