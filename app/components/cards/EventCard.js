import React from "react";
import { View, StyleSheet } from "react-native";
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

function getLabel(opens, closes) {
	const openingDate = new Date(opens);
	const closingDate = new Date(closes);
	const now = new Date();

	const label = (
		date,
		prefix,
		front = colors.appFront,
		back = colors.appBack
	) => ({
		backgroundColor: back,
		color: front,
		distanceToNow:
			prefix + formatDistanceToNowStrict(date, { addSuffix: true }),
	});

	// --- It hasn't started yet ('^-^) --- //
	if (openingDate > now) {
		const prefix = "Will start ";
		// In less than 1 hour: It's already there
		if (differenceInHours(openingDate, now) < 1)
			return label(openingDate, prefix, colors.danger, colors.dangerLight);
		// Today: Get ready
		if (differenceInHours(openingDate, now) < 24)
			return label(openingDate, prefix, colors.warning, colors.warningLight);
		// In less than 3 days: Coming soon
		if (differenceInDays(openingDate, now) < 3)
			return label(openingDate, prefix, colors.optimal, colors.optimalLight);
		// Else: It's okay (^-^)
		else return label(openingDate, prefix);
	}

	// --- It has already started (*o*) --- //
	else if (closingDate > now) {
		const prefix = "Will end ";
		// In less than 10 minutes: Hurry up!
		if (differenceInMinutes(closingDate, now) < 10)
			return label(closingDate, prefix, colors.danger, colors.dangerLight);
		// In less than 30 minutes: It'll be over soon
		if (differenceInMinutes(closingDate, now) < 30)
			return label(closingDate, prefix, colors.warning, colors.warningLight);
		// Else: It's okay (^-^)
		else return label(closingDate, prefix, colors.ok, colors.okLight);
	}

	// --- It has been closed already :( --- //
	return label(closingDate, "Closed ");
}

function EventCard({
	event: { type, classroom, name, dateOpening, dateClosing },
}) {
	const label = getLabel(dateOpening, dateClosing);

	return (
		<View
			style={[styles.container, { backgroundColor: label.backgroundColor }]}
		>
			<View style={styles.header}>
				<NettText
					style={[styles.type, { color: label.color }]}
					numberOfLines={1}
				>
					{type}
				</NettText>
				<Badge
					style={styles.badge}
					color={label.color}
					size={7}
					useBorders={false}
				/>
				<NettText
					style={[styles.classroom, { color: label.color }]}
					numberOfLines={1}
				>
					{classroom}
				</NettText>
			</View>
			<Divider
				style={[styles.divider, { backgroundColor: label.backgroundColor }]}
			/>
			<NettText style={[styles.name, { color: label.color }]} numberOfLines={3}>
				{name}
			</NettText>
			<NettText
				style={[styles.distanceToNow, { color: label.color }]}
				numberOfLines={1}
			>
				{label.distanceToNow}
			</NettText>
		</View>
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
