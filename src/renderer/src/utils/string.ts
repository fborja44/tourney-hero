import { CHARACTERS } from '@common/constants/data';
import { Character } from '@common/interfaces/Types';

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
 * Generates a proper string representation for a character
 * @param character The character to get a string for
 * @returns The associated character string
 */
export const characterToString = (character: Character) => {
	if (typeof character !== 'string') {
		throw new TypeError('Input must be of type string');
	}
	if (!CHARACTERS.includes(character)) {
		throw new TypeError('Invalid character');
	}
	switch (character) {
		case 'CaptainFalcon':
			return 'Captain Falcon';
		case 'DrMario':
			return 'Dr. Mario';
		case 'DonkeyKong':
			return 'Donkey Kong';
		case 'IceClimbers':
			return 'Ice Climbers';
		case 'MrGameWatch':
			return 'Mr. Game & Watch';
		case 'YoungLink':
			return 'Young Link';
		default:
			return character;
	}
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
