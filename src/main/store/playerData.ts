import store from '.';
import { MAX_PRONOUN_LENGTH, MAX_TAG_LENGTH, MAX_TEAM_LENGTH } from '../../common/constants/limits';
import { app, dialog, IpcMainInvokeEvent } from 'electron';
import Joi from 'joi';
import { LocalPlayer } from '../../common/interfaces/Data';
import { JoiUUID } from '../../common/validator';
import { JoiCharacter } from '../../common/validator/JoiGameplay';
import fs from 'fs';
import path from 'path';

const JoiLocalPlayer = Joi.object({
	id: JoiUUID.required(),
	tag: Joi.string().min(1).max(MAX_TAG_LENGTH).required(),
	characterId: JoiCharacter.required(),
	team: Joi.string().max(MAX_TEAM_LENGTH).allow('').trim().required(),
	pronoun: Joi.string().max(MAX_PRONOUN_LENGTH).allow('').trim().required(),
	countryCode: Joi.string().max(3).allow('').trim().required()
});
const JoiLocalPlayerList = Joi.array().items(JoiLocalPlayer).required();

/**
 * Gets the local player data list from the electron store.
 * @returns The array if found. Otherwise, returns the empty array.
 */
const getPlayersList = (): LocalPlayer[] => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const playersList: any = store.get('players');
	// Validate local players
	const result = JoiLocalPlayerList.validate(playersList);
	if (result.error) {
		console.error(result.error);
		store.set('players', []);
		return [];
	}
	return playersList;
};

/**
 * Gets the player list
 * @returns The array if found. Otherwise, returns the empty array.
 */
export const handleGetPlayersList = () => {
	return getPlayersList();
};

/**
 * Adds player data to the store.
 * @param name The player name
 * @param social The player's social media handle (optional)
 * @returns The new players list if successful. Otherwise, returns false.
 */
export const handleAddLocalPlayer = (ev: IpcMainInvokeEvent, data: LocalPlayer) => {
	// Validate data
	const result = JoiLocalPlayer.required().validate(data);
	if (result.error) {
		return { error: result.error.message };
	}

	const { tag } = data;

	const playersList = getPlayersList();

	if (playersList.find((player) => player.tag === tag)) {
		return { error: 'Player not found' };
	}

	playersList.push(data);
	store.set('players', playersList);
	ev.sender.send('player:updated');
	return { data: playersList };
};

/**
 * Updates an existing player in the store.
 * @returns The new players list if successful. Otherwise, returns false.
 */
export const handleUpdateLocalPlayer = (ev: IpcMainInvokeEvent, data: LocalPlayer) => {
	// Validate data
	const result = JoiLocalPlayer.required().validate(data);
	if (result.error) {
		return { error: result.error.message };
	}

	const { id, tag } = data;

	const playersList = getPlayersList();

	if (!playersList.find((player) => player.id === id)) {
		return { error: 'Player not found' };
	}

	if (playersList.find((player) => player.tag === tag && player.id !== id)) {
		return { error: 'Player with tag already exists' };
	}

	const newList = playersList.map((player) => (player.id === id ? data : player));
	store.set('players', newList);
	ev.sender.send('player:updated');
	return { data: playersList };
};

/**
 * Deletes local player data from the store.
 * @returns The new players list if successful. Otherwise, returns false.
 */
export const handleDeleteLocalPlayer = (ev: IpcMainInvokeEvent, data: string) => {
	if (typeof data !== 'string') {
		return { error: 'Invalid player' };
	}

	const playersList = getPlayersList();
	if (!playersList.find((player) => player.id === data)) {
		return { error: 'Player not found' };
	}
	const newList = playersList.filter((player) => player.id !== data);
	store.set('players', newList);
	ev.sender.send('player:updated');
	return { data: newList };
};

/**
 * Import local player data from a JSON file. The JSON file should be an array of LocalPlayer objects.
 * @returns The new players list if successful. Otherwise, returns an error message.
 */
export const handleImportLocalPlayers = async () => {
	try {
		const result = await dialog.showOpenDialog({
			properties: ['openFile'],
			filters: [{ name: 'JSON Files', extensions: ['json'] }]
		});

		if (result.canceled || result.filePaths.length === 0) {
			console.error('Cancelled import');
			return { error: 'No file selected' };
		}

		const filePath = result.filePaths[0];
		const rawData = fs.readFileSync(filePath, 'utf-8');
		const jsonData = JSON.parse(rawData);

		// Validate data
		const validationResult = JoiLocalPlayerList.validate(jsonData);
		if (validationResult.error) {
			console.error(validationResult.error);
			return { error: validationResult.error.message };
		}
		console.log('Importing players from', filePath);

		// Save to store
		store.set('players', validationResult.value);

		return { data: validationResult.value };
	} catch (err) {
		console.error(err);
		return { error: 'Failed to read JSON file' };
	}
};

/**
 * Exports local player data to a JSON file. The JSON file will be an array of LocalPlayer objects.
 * @param ev The IPC event
 * @param data The player data to export
 * @returns The file path if successful. Otherwise, returns an error message.
 */
export const handleExportLocalPlayers = async (_ev: IpcMainInvokeEvent, data: LocalPlayer[]) => {
	try {
		const downloadsPath = app.getPath('downloads');
		const defaultFilePath = path.join(downloadsPath, 'players.json');

		const result = await dialog.showSaveDialog({
			title: 'Export Local Players',
			defaultPath: defaultFilePath,
			filters: [{ name: 'JSON Files', extensions: ['json'] }],
			properties: ['showOverwriteConfirmation']
		});

		if (result.canceled || !result.filePath) {
			console.error('Cancelled export');
			return { error: 'Save canceled' };
		}

		const filePath = result.filePath;

		// Validate data
		const validationResult = JoiLocalPlayerList.validate(data);
		if (validationResult.error) {
			console.error(validationResult.error);
			return { error: validationResult.error.message };
		}

		// Convert to formatted JSON
		const jsonString = JSON.stringify(data, null, 2);

		fs.writeFileSync(filePath, jsonString, 'utf-8');
		console.log('Exporting players to', filePath);

		return { data: filePath };
	} catch (err) {
		console.error(err);
		return { error: 'Failed to save JSON file' };
	}
};
