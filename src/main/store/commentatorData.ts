import { MAX_COMMENTATOR_LENGTH } from '../../common/constants/limits';
import { IpcMainInvokeEvent } from 'electron';
import Joi from 'joi';
import store from '.';
import { LocalCommentator } from '../../common/interfaces/Data';

const JoiLocalCommentator = Joi.object({
	name: Joi.string().min(1).max(MAX_COMMENTATOR_LENGTH).trim().required(),
	social: Joi.string().max(MAX_COMMENTATOR_LENGTH).allow('').trim().required()
});
const JoiLocalCommentatorList = Joi.array().items(JoiLocalCommentator).required();

/**
 * Gets the local commentator data list from the electron store.
 * @returns The array if found. Otherwise, returns the empty array.
 */
const getCommentatorsList = (): LocalCommentator[] => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const commentatorsList: any = store.get('commentators');
	// Validate local commentators
	const result = JoiLocalCommentatorList.validate(commentatorsList);
	if (result.error) {
		console.error(result.error);
		store.set('commentators', []);
		return [];
	}
	return commentatorsList;
};

/**
 * Gets the commentator list
 * @returns The array if found. Otherwise, returns the empty array.
 */
export const handleGetCommentatorsList = () => {
	return getCommentatorsList();
};

/**
 * Adds commentator data to the store.
 * @returns The new commentators list if successful. Otherwise, returns false.
 */
export const handleAddLocalCommentator = (ev: IpcMainInvokeEvent, data: LocalCommentator) => {
	// Validate data
	const result = JoiLocalCommentator.required().validate(data);
	if (result.error) {
		console.error(result.error);
		return false;
	}

	const { name } = data;

	const commentatorsList = getCommentatorsList();

	if (commentatorsList.find((commentator) => commentator.name === name)) {
		return false;
	}

	commentatorsList.push(data);
	store.set('commentators', commentatorsList);
	ev.sender.send('commentator:update');
	return commentatorsList;
};

/**
 * Deletes local commentator data from the store.
 * @returns The new commentators list if successful. Otherwise, returns false.
 */
export const handleDeleteLocalCommentator = (ev: IpcMainInvokeEvent, data: string) => {
	if (typeof data !== 'string') {
		return false;
	}

	const commentatorsList = getCommentatorsList();
	if (!commentatorsList.find((commentator) => commentator.name === data)) {
		return false;
	}
	const newList = commentatorsList.filter((commentator) => commentator.name !== data);
	store.set('commentators', newList);
	ev.sender.send('commentator:update');
	return newList;
};
