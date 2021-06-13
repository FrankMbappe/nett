import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Divider } from "react-native-elements";
import {
	differenceInDays,
	differenceInHours,
	differenceInMinutes,
	formatDistanceToNowStrict,
} from "date-fns";
import Badge from "../Badge";
import NettText from "../Text";
import colors from "../../config/colors";
import { getEventProps } from "../../utils";

function EventCard({
	event: { type, classroom, name, dateOpening, dateClosing },
	onPress,
}) {
	const properties = getEventProps(dateOpening, dateClosing);

	return (
		<TouchableOpacity
			style={[
				styles.container,
				{ backgroundColor: properties.backgroundColor },
			]}
			onPress={onPress}
		>
			<View style={styles.header}>
				<NettText
					style={[styles.type, { color: properties.color }]}
					numberOfLines={1}
				>
					{type}
				</NettText>
				<Badge
					style={styles.badge}
					color={properties.color}
					size={7}
					useBorders={false}
				/>
				<NettText
					style={[styles.classroom, { color: properties.color }]}
					numberOfLines={1}
				>
					{classroom}
				</NettText>
			</View>
			<Divider
				style={[
					styles.divider,
					{ backgroundColor: properties.backgroundColor },
				]}
			/>
			<NettText
				style={[styles.name, { color: properties.color }]}
				numberOfLines={3}
			>
				{name}
			</NettText>
			<NettText
				style={[styles.distanceToNow, { color: properties.color }]}
				numberOfLines={1}
			>
				{properties.distanceToNow}
			</NettText>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		width: 185,
		height: 140,
		margin: 5,
		borderRadius: 10,
		elevation: 3,
		flexGrow: 0,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
	},
	type: {
		textTransform: "uppercase",
		fontWeight: "700",
		fontSize: 9,
	},
	badge: {
		marginHorizontal: 5,
	},
	classroom: {
		flex: 1,
		fontWeight: "700",
		fontStyle: "italic",
		fontSize: 9,
	},
	divider: {
		width: "100%",
		marginTop: 5,
	},
	name: {
		flex: 1,
		fontWeight: "700",
		fontSize: 18,
	},
	distanceToNow: {
		width: "100%",
		padding: 7,
		fontSize: 10,
		textAlign: "center",
		backgroundColor: "#fcfcfcbf",
		borderRadius: 7,
	},
});

export default EventCard;
