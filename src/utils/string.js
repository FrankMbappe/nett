function capitalize(stringValue) {
	if (!stringValue || !stringValue instanceof String)
		return String(stringValue);
	return stringValue[0].toUpperCase().concat(stringValue.substr(1));
}

/**
 * Puts a word in plural according its number of occurences
 * @param {*} count The number of occurences
 * @param {*} label The word to format
 * @param {*} plural (Optional) the plural form of the word, if the latter has an irregular one
 * @returns The formatted word
 */
function formatWordCount(count, label, plural = null) {
	return `${count != 0 ? count : "no"} ${
		count == 1 ? label : plural ?? label + "s"
	}`;
}

/**
 * Puts a word in plural according its number of occurences, but does not display the count
 * @param {*} count The number of occurences
 * @param {*} label The word to format
 * @param {*} plural (Optional) the plural form of the word, if the latter has an irregular one
 * @returns The formatted word
 */
function formatWordWithoutCount(count, label, plural = null) {
	return `${count == 1 ? label : plural ?? label + "s"}`;
}

export { capitalize, formatWordCount, formatWordWithoutCount };
