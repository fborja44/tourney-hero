/**
 * Converts a unix timestamp to a formatted date string.
 * @param unixTimestamp The timestamp to format
 * @returns The formatted date string
 */

export const convertUnixTimestamp = (unixTimestamp: number) => {
	if (typeof unixTimestamp !== 'number' || unixTimestamp === 0) {
		return 'Time Unspecified';
	}
	const date = new Date(unixTimestamp * 1000); // Convert seconds to milliseconds
	const formattedDate = new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		timeZoneName: 'short',
		timeZone: 'America/New_York'
	}).format(date);
	return formattedDate;
};

/**
 * Gets the current Unix Timestamp.
 * TODO: Local time zone
 */
export const getCurrentUnixTimestamp = () => {
	// Create a new Date object for the current time
	const currentDate = new Date();

	// Set the time zone to Eastern Standard Time (EST)
	currentDate.toLocaleString('en-US', { timeZone: 'America/New_York' });

	// Get the Unix timestamp (in seconds) by dividing by 1000
	return Math.floor(currentDate.getTime() / 1000);
};

/**
 * Formats a frame count to the string 'XXm XXs'
 * @param frameCount The frame count to format
 * @returns The formatted string
 */
export const formatFrames = (frameCount: number | null | undefined) => {
	if (!frameCount) {
		return 'Unknown';
	}
	const totalSeconds = frameCount / 60;
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = Math.floor(totalSeconds % 60);
	return `${minutes}m ${seconds}s`;
};
