import { createReducer } from '@reduxjs/toolkit';
import {
	addSelectedReplay,
	removeSelectedReplay,
	setReplayDirectory,
	setReplayList
} from '../actions/replaysActions';
import { ReplayData } from '@common/interfaces/Types';

export type ReplayState = {
	replayDir: string;
	replayList: ReplayData[];
	selectedReplays: string[];
};

const initialState: ReplayState = {
	replayDir: '',
	replayList: [],
	selectedReplays: []
};

const replaysReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(setReplayDirectory, (state, action) => {
			state.replayDir = action.payload;
		})
		.addCase(setReplayList, (state, action) => {
			state.replayList = action.payload;
		})
		.addCase(addSelectedReplay, (state, action) => {
			if (!state.selectedReplays.includes(action.payload)) {
				state.selectedReplays.push(action.payload);
			}
		})
		.addCase(removeSelectedReplay, (state, action) => {
			if (state.selectedReplays.includes(action.payload)) {
				state.selectedReplays = state.selectedReplays.filter(
					(fileName) => fileName !== action.payload
				);
			}
		});
});

export default replaysReducer;
