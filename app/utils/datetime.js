import { formatDuration } from "date-fns";

const MONTH_NAMES = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

function getFormattedDate(date, prefomattedDate = false, hideYear = false) {
	const day = date.getDate();
	const month = MONTH_NAMES[date.getMonth()];
	const year = date.getFullYear();
	const hours = date.getHours();
	let minutes = date.getMinutes();

	if (minutes < 10) {
		// Adding leading zero to minutes
		minutes = `0${minutes}`;
	}

	if (prefomattedDate) {
		// Today at 10:20
		// Yesterday at 10:20
		return `${prefomattedDate} at ${hours}:${minutes}`;
	}

	if (hideYear) {
		// 10. January at 10:20
		return `${day}. ${month} at ${hours}:${minutes}`;
	}

	// 10. January 2017. at 10:20
	return `${day}. ${month} ${year}. at ${hours}:${minutes}`;
}

function timeAgo(dateToString) {
	if (!dateToString) {
		return null;
	}

	// const date = typeof dateToString === "object" ? dateToString : new Date(dateToString);
	const date = new Date(Date.parse(dateToString));
	const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
	const today = new Date();
	const yesterday = new Date(today - DAY_IN_MS);
	const seconds = Math.round((today - date) / 1000);
	const minutes = Math.round(seconds / 60);
	const isToday = today.toDateString() === date.toDateString();
	const isYesterday = yesterday.toDateString() === date.toDateString();
	const isThisYear = today.getFullYear() === date.getFullYear();

	if (seconds < 5) {
		return "now";
	} else if (seconds < 60) {
		return `${seconds} seconds ago`;
	} else if (seconds < 90) {
		return "about a minute ago";
	} else if (minutes < 60) {
		return `${minutes} minutes ago`;
	} else if (isToday) {
		return getFormattedDate(date, "Today"); // Today at 10:20
	} else if (isYesterday) {
		return getFormattedDate(date, "Yesterday"); // Yesterday at 10:20
	} else if (isThisYear) {
		return getFormattedDate(date, false, true); // 10. January at 10:20
	}

	return getFormattedDate(date); // 10. January 2017. at 10:20
}

function secondsToTime(seconds) {
	seconds = Math.round(seconds);
	var hours = Math.floor(seconds / (60 * 60));

	var divisor_for_minutes = seconds % (60 * 60);
	var minutes = Math.floor(divisor_for_minutes / 60);

	var divisor_for_seconds = divisor_for_minutes % 60;
	var seconds = Math.ceil(divisor_for_seconds);

	return {
		hours: hours,
		minutes: minutes,
		seconds: seconds,
	};
}

function formatTime(time) {
	return formatDuration(secondsToTime(time));
}

export { timeAgo, secondsToTime, formatTime };
