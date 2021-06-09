import countryCodes from "./countryCodes";

// Buttons
const buttons = {
	PRIMARY: 0,
	SECONDARY: 1,
	TERTIARY: 2,
};

// Countries
const countries = countryCodes.map((x) => {
	return {
		key: x.code,
		label: `${x.flag}   ${x.name} (${x.dialCode})`,
		value: x.dialCode,
	};
});

// Account status
const accountStatus = {
	OFFLINE: 0,
	ONLINE: 1,
};

// Account types
const accountTypes = {
	teacher: "teacher",
	student: "student",
	consultant: "consultant",
};

const timerStatus = {
	active: "active",
	standBy: "standBy",
	ended: "ended",
	noTimer: "noTimer",
};

export { buttons, countries, accountStatus, accountTypes, timerStatus };
