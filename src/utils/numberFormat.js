const suffixes = ["", "k", "M", "G", "T", "P", "E"];

/**
 *
 * @param {The number to format} number
 * @returns A formatted version of a number, adding automatically a suffix to it, such as 'k' or 'M'
 */
function numberFormat(number) {
	/* We determine which symbol to choose. E.g., 1,542 => 'k'; 1,400,000 => 'M' */
	const tier = (Math.log10(Math.abs(number)) / 3) | 0;

	/* If zero, there's no need to add a suffix. E.g., 125 => 125 */
	if (tier == 0) return String(number);

	/* We get the corresponding suffix */
	const suffix = suffixes[tier];

	/* We get the scale. E.g., 1,542 => 1000; 1,400,000 => 1000000 */
	const scale = Math.pow(10, tier * 3);

	/* We scale the given number. 
       E.g., 1,542 => scale = 1000; scaled = 1542 / scale = 1.542 */
	const scaled = number / scale;

	/* Finally, we format the number by just taking one decimal place 
       and adding the corresponding sufffix. E.g., 1542 => 1.5k */
	return scaled.toFixed(1) + suffix;
}

export default numberFormat;
