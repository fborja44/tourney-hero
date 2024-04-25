import { dialog } from 'electron';

/**
 * Event handler to select a directory
 * @param ev The electron event
 * @param data The
 */
export const handleSelectDir = async () => {
	const result = await dialog.showOpenDialog({
		properties: ['openDirectory']
	});
	if (!result.canceled) {
		return result.filePaths[0];
	}
	return undefined;
};
