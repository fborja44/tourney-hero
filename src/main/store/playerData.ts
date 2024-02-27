import store from '.';
import { MAX_PRONOUN_LENGTH, MAX_TAG_LENGTH, MAX_TEAM_LENGTH } from '../../common/constants/limits';
import { IpcMainInvokeEvent } from 'electron';
import Joi from 'joi';
import { CHARACTERS } from '../../common/constants/data';
import { LocalPlayer } from '../../common/interfaces/Data';
import { JoiUUID } from '../../common/validator';

const JoiLocalPlayer = Joi.object({
	id: JoiUUID.required(),
	tag: Joi.string().min(1).max(MAX_TAG_LENGTH).required(),
	character: Joi.string()
		.valid(...CHARACTERS, '')
		.required(),
	team: Joi.string().max(MAX_TEAM_LENGTH).allow('').trim().required(),
	pronoun: Joi.string().max(MAX_PRONOUN_LENGTH).allow('').trim().required()
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
