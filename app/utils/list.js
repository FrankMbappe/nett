import { findIndex, includes, indexOf, isEqual } from "lodash";

/**
 * Returns the next item of an array from a specified index
 * @param {*} list Array to get the next item
 * @param {*} currentItem Item at the current position in the array
 * @returns The next item of the array
 */
function getNextItem(list, currentItem = null) {
	if (currentItem != null) {
		const currentIndex = indexOf(list, currentItem);
		const nextIndex = getNextIndex(currentIndex, list);
		if (!nextIndex) return null;
		else return list[nextIndex];
	}
	return list[0];
}

/**
 * Returns the previous item of an array from a specified index
 * @param {*} list Array to get the previous item
 * @param {*} currentIndex Current position in the array
 * @returns The previous item of the array
 */
function getPreviousItem(list, currentItem = null) {
	if (currentItem != null) {
		const currentIndex = indexOf(list, currentItem);
		const previousIndex = getPreviousIndex(currentIndex, list);
		if (!previousIndex) return null;
		else return list[previousIndex];
	}
	return getLastItem(list);
}

/**
 * Returns the next item's index of an array from a specified index
 * @param {*} list Array to get the next item
 * @param {*} currentIndex Current position in the array
 * @returns The next item's index of the array
 */
function getNextIndex(currentIndex = 0, list) {
	if (!list || !list.length) return null;
	if (currentIndex + 1 <= list.length - 1) return currentIndex + 1;
	else return null;
}

/**
 * Returns the previous item's index of an array from a specified index
 * @param {*} list Array to get the previous item
 * @param {*} currentIndex Current position in the array
 * @returns The previous item's index of the array
 */
function getPreviousIndex(currentIndex, list) {
	if (!list || !list.length) return null;
	if (currentIndex - 1 >= 0) return currentIndex - 1;
	else return null;
}

/**
 * Returns the last item of an array
 * @param {*} list Array to get the last item
 * @returns The last item of the array
 */
function getLastItem(list) {
	if (!list || !list.length) return null;
	return list[list.length - 1];
}

/**
 * Adds or removes an item of an array depending on if it is in that array or not
 * @param {*} item Item to add/remove
 * @param {*} list Array to add/remove the item
 * @param {*} maxLength (Optional) Maximum length of the final array
 * @returns The mutated array
 */
function toggleAddRemove(item, list, maxLength = null) {
	const outOfBounds = maxLength !== null ? list.length + 1 > maxLength : false;
	if (!list.includes(item)) {
		// If the item will be out of bounds, I remove the first element of the
		// array to give a place to the item we want to add.
		if (outOfBounds) return list.slice(1).concat(item);
		return list.concat(item);
	} else {
		return list.filter((x) => x !== item);
	}
}

/**
 * Adds or removes an object from an array depending on if it is present or not
 * @param {*} object Object to add/remove
 * @param {*} comparator The attribute on which comparisons will be made
 * @param {*} list Array to add/remove the object
 * @returns The mutated array
 */
function toggleAddRemoveObject(object, list, comparator = null) {
	if (!comparator) {
		if (!includes(list, object)) return list.concat(object);
		else return list.filter((x) => !isEqual(x, object));
	}
	if (!includesObject(object, list, comparator)) return list.concat(object);
	else {
		return list.filter((x) => x[comparator] !== object[comparator]);
	}
}

/**
 * Checks if an object is in an array of objects
 * @param {*} object The object to check
 * @param {*} comparator The attribute on which comparisons will be made
 * @param {*} list Array to check
 * @returns A Boolean value indicating if the object is in the array
 */
function includesObject(object, list, comparator = null) {
	if (!comparator)
		return list
			.map((x) => JSON.stringify(x))
			.some((x) => x === JSON.stringify(object));
	else return list.some((x) => x[comparator] === object[comparator]);
}

/**
 * Checks if two arrays of objects are equal
 * @param {*} left The main array
 * @param {*} right The other array
 * @param {*} objectComparator The attribute on which comparisons are made
 * @returns A Boolean indicating if the two arrays are equals
 */
function areEqual(left, right, objectComparator = null) {
	/* If one of them is null, I directly stringify them to check if they are equal.
	   In that way, if both are null, the function will return true. */
	if (left === null || right === null)
		return JSON.stringify(left) === JSON.stringify(right);

	/* If the lengths of the arrays are different, they can't be equal. */
	if (left.length !== right.length) return false;

	/* I stringify each item of each array to check if each item exist in both arays. */
	const leftToString = left.map((x) => JSON.stringify(x));
	const rightToString = right.map((x) => JSON.stringify(x));
	let equal = true;

	leftToString.forEach(
		(object) =>
			(equal &= includesObject(object, rightToString, objectComparator))
	);

	/* I return the final result */
	return equal;
}

function removeFirstIndex(list) {
	if (list.length === 1) return [];
	return list.slice(1);
}

export {
	getNextItem,
	getNextIndex as getNextItemIndex,
	getPreviousItem,
	getPreviousIndex as getPreviousItemIndex,
	getLastItem,
	toggleAddRemove,
	toggleAddRemoveObject,
	includesObject,
	areEqual,
	removeFirstIndex,
};
