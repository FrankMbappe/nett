import {
	formatDistanceToNowStrict,
	differenceInHours,
	differenceInDays,
	differenceInMinutes,
} from "date-fns";
import { startCase } from "lodash";
import colors from "../config/colors";

function getEventProps(opens, closes) {
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
		const prefix = "Pending, will start ";

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
		return label(openingDate, prefix);
	}

	// --- It has already started (*o*) --- //
	else if (closingDate > now) {
		const prefix = "Opened, will end ";

		// In less than 10 minutes: Hurry up!
		if (differenceInMinutes(closingDate, now) < 10)
			return label(closingDate, prefix, colors.danger, colors.dangerLight);

		// In less than 30 minutes: It'll be over soon
		if (differenceInMinutes(closingDate, now) < 30)
			return label(closingDate, prefix, colors.warning, colors.warningLight);

		// Else: It's okay (^-^)
		return label(closingDate, prefix, colors.ok, colors.okLight);
	}

	// --- It has been closed already :( --- //
	return label(closingDate, "Closed ");
}

const userFullName = ({ honorific, firstName, lastName }) => {
	return startCase(`${honorific ?? ""} ${firstName} ${lastName}`.trim());
};

export { getEventProps, userFullName };
