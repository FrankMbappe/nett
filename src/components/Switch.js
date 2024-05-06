import React, { useState } from "react";
import { View, StyleSheet, Switch } from "react-native";
import colors from "../config/colors";
import NettText from "./Text";

function NettSwitch({
	text,
	description,
	onToggleSwitch,
	containerStyle,
	enabled = false,
}) {
	const [isEnabled, setIsEnabled] = useState(enabled);
	const toggleSwitch = () =>
		setIsEnabled((previousState) => {
			onToggleSwitch && onToggleSwitch(!previousState);
			return !previousState;
		});

	return (
		<View style={[styles.container, containerStyle]}>
			<View style={styles.mainContainer}>
				<NettText style={styles.text}>{text}</NettText>
				<Switch
					trackColor={{ false: colors.medium, true: colors.ok }}
					thumbColor={isEnabled ? colors.lighter : colors.light}
					ios_backgroundColor={colors.ok}
					onValueChange={toggleSwitch}
					value={isEnabled}
				/>
			</View>
			{description && (
				<NettText style={styles.description}>{description}</NettText>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
	},
	mainContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	text: {
		flex: 1,
		fontSize: 17,
	},
	description: {
		flex: 1,
		fontSize: 13,
		color: colors.medium,
		marginTop: 3,
	},
});

export default NettSwitch;
