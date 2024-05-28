import { ReplayData } from '@common/interfaces/Types';
import { createAction } from '@reduxjs/toolkit';

export const setReplayDirectory = createAction('SET_REPLAY_DIRECTORY', (path: string) => {
	return {
		payload: path
	};
});

export const setReplayList = createAction('SET_REPLAY_LIST', (replayList: ReplayData[]) => {
	return {
		payload: replayList
	};
});

export const addSelectedReplay = createAction('ADD_SELECTED_REPLAY', (fileName: string) => {
	return {
		payload: fileName
	};
});

export const removeSelectedReplay = createAction('REMOVE_SELECTED_REPLAY', (fileName: string) => {
	return {
		payload: fileName
	};
});
