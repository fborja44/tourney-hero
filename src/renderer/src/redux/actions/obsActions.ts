import { createAction } from '@reduxjs/toolkit';

export const resetOBSData = createAction('RESET_OBS_DATA', () => {
	return {
		payload: true,
	};
});

export const setCurrentOBSScene = createAction(
	'SET_CURRENT_SCENE',
	(sceneTitle: string) => {
		return {
			payload: sceneTitle,
		};
	}
);

export const setOBSScenesList = createAction(
	'SET_OBS_SCENES_LIST',
	(scenesList: any[]) => {
		return {
			payload: scenesList,
		};
	}
);
