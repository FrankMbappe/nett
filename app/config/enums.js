import countryCodes from "./countryCodes";

// Buttons
const buttons = {
	PRIMARY: 0,
	SECONDARY: 1,
	TERTIARY: 2,
};

// Countries
const countries = countryCodes.map((x) => {
	return { key: x.code, label: `${x.flag}  ${x.name}`, value: x.dial_code };
});

// Account status
const accountStatus = {
	OFFLINE: 0,
	ONLINE: 1,
};

export { buttons, countries, accountStatus };
