import { createReducer } from '@reduxjs/toolkit';
import {
	resetOBSData,
	setCurrentOBSScene,
	setOBSScenesCollections,
	setOBSScenesList
} from '../actions/obsActions';

export type OBSState = {
	currentScene: string | null;
	sceneList: string[];
	sceneCollectionList: string[];
};

const initialState: OBSState = {
	currentScene: null,
	sceneList: [],
	sceneCollectionList: []
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
		})
		.addCase(setOBSScenesCollections, (state, action) => {
			state.sceneCollectionList = action.payload;
		});
});

export default obsReducer;
