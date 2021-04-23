import React from "react";
import {
	Text,
	View,
	StyleSheet,
	Image,
	TouchableHighlight,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

import colors from "../config/colors";

const IMAGE_SIZE = { width: 50, height: 50 };

function ListItem({ style, imageIsRounded = false, ...otherProps }) {
	return (
		<Swipeable
			renderRightActions={otherProps.renderRightActions}
			renderLeftActions={otherProps.renderLeftActions}
		>
			<TouchableHighlight
				underlayColor={colors.light}
				onPress={otherProps.onPress}
			>
				<View style={[styles.card, style]}>
					{otherProps.ImageComponent /* e.g., an Icon component */}
					{
						/*Basic tip in react to display a component only if a certain value is not null*/
						otherProps.image && (
							<Image
								style={[
									styles.image,
									{ borderRadius: imageIsRounded ? IMAGE_SIZE.width / 2 : 0 },
								]}
								source={otherProps.image}
							/>
						)
					}
					<View style={styles.descriptionContainer}>
						<Text style={styles.name}>{otherProps.name}</Text>
						{otherProps.description && (
							<Text style={styles.description}>{otherProps.description}</Text>
						)}
					</View>
				</View>
			</TouchableHighlight>
		</Swipeable>
	);
}

const styles = StyleSheet.create({
	card: {
		padding: 15,
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 15,
		width: "100%",
	},
	description: {
		fontSize: 13,
		paddingTop: 3,
		opacity: 0.75,
	},
	descriptionContainer: {
		flex: 1,
		marginStart: 20,
		justifyContent: "center",
	},
	image: {
		width: IMAGE_SIZE.width,
		height: IMAGE_SIZE.height,
	},
	name: {
		fontSize: 19,
		fontWeight: "bold",
	},
});

export default ListItem;
