const sizes = ["bytes", "KB", "MB", "GB", "TB"];

/**
 *
 * @param {Represents the number of bytes to convert} bytes
 * @returns the automatic conversion of a number of bytes to Kilobytes, Megabytes, Gigabytes, and Terabytes
 */
function bytesToSize(bytes) {
	if (bytes == 0) return "n/a";
	const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
	if (i == 0) return `${bytes} ${sizes[i]}`;
	return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
}

export default bytesToSize;
