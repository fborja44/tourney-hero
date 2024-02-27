import store from '.';
import { MAX_PRONOUN_LENGTH, MAX_TAG_LENGTH, MAX_TEAM_LENGTH } from '../../common/constants/limits';
import { IpcMainInvokeEvent } from 'electron';
import Joi from 'joi';
import { Character } from '../../common/interfaces/Types';
import { CHARACTERS } from '../../common/constants/data';

interface LocalPlayer {
	tag: string;
	character?: Character;
	team?: string;
	pronoun?: string;
}

const JoiLocalPlayer = Joi.object({
	tag: Joi.string().min(1).max(MAX_TAG_LENGTH).required(),
	character: Joi.string().valid(...CHARACTERS),
	team: Joi.string().min(1).max(MAX_TEAM_LENGTH),
	pronoun: Joi.string().min(1).max(MAX_PRONOUN_LENGTH)
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
 * Adds player data to the store.
 * @param name The player name
 * @param social The player's social media handle (optional)
 * @returns The new players list if successful. Otherwise, returns false.
 */
export const handleAddLocalPlayer = (_ev: IpcMainInvokeEvent, data: LocalPlayer) => {
	// Validate data
	const result = JoiLocalPlayer.required().validate(data);
	if (result.error) {
		console.error(result.error);
		return false;
	}

	const { tag } = data;

	const playersList = getPlayersList();

	if (playersList.find((player) => player.tag === tag)) {
		return false;
	}

	playersList.push(data);
	store.set('players', playersList);
	return playersList;
};

/**
 * Deletes local player data from the store.
 * @returns The new players list if successful. Otherwise, returns false.
 */
export const handleDeleteLocalPlayer = (_ev: IpcMainInvokeEvent, data: string) => {
	if (typeof data !== 'string') {
		return false;
	}

	const playersList = getPlayersList();
	if (!playersList.find((player) => player.tag === data)) {
		return false;
	}
	const newList = playersList.filter((player) => player.tag !== data);
	store.set('players', newList);
	return newList;
};
