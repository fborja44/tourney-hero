/**
 * Capitalizes the first character in a string
 * @param string The string to capitalize
 * @returns The string with the first character capitalized.
 */
export const capitalize = (string: string) => {
	if (typeof string !== 'string') {
		throw new TypeError('Input must be of type string');
	}
	return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * Converts a string of words (separated by spaces) to camel case.
 * @param string  The string to convert
 * @returns The string formatted in camel case
 */
export const toCamelCase = (string: string) => {
	if (typeof string !== 'string') {
		throw new TypeError('Input must be of type string');
	}
	return string
		.split(' ')
		.map((word, index) => (index === 0 ? word.toLowerCase() : capitalize(word)))
		.join('');
};

/**
 * Checks if a given string contains only numberic characters
 * @param string
 * @returns
 */
export const isInteger = (string: string) => {
	if (typeof string != 'string') return false;
	return /^\d+$/.test(string) && Number.isInteger(parseInt(string, 10));
};

/**
 * Gets an event slug from the whole tournament event slug.
 * @param slug The slug to parse.
 * @returns The event slug
 */
export const getEventSlug = (slug: string): string => {
	const segments = slug.split('/');
	return segments[segments.length - 1];
};

/**
 * Trims the team prefix from a start.gg entrant name or other string.
 * @param str The tag or string to trim
 * @returns The new string without the prefix
 */
export const trimNamePrefix = (str: string): string => {
	if (typeof str !== 'string') {
		return '';
	}

	const pipeIndex = str.indexOf('|');
	if (pipeIndex !== -1) {
		return str.slice(pipeIndex + 1).trim();
	}
	// Return the original string if pipe character is not found
	return str.trim();
};
