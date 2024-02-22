import { createReducer } from '@reduxjs/toolkit';
import { resetOBSData, setCurrentOBSScene, setOBSScenesList } from '../actions/obsActions';

export type OBSState = {
	currentScene: string | null;
	sceneList: string[];
};

const initialState: OBSState = {
	currentScene: null,
	sceneList: []
};

const obsReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(setCurrentOBSScene, (state, action) => {
			state.currentScene = action.payload;
		})
		.addCase(resetOBSData, (state) => {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			state = { ...state, ...initialState };
		})
		.addCase(setOBSScenesList, (state, action) => {
			state.sceneList = action.payload;
		});
});

export default obsReducer;
