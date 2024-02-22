/**
 * Finds an OBS scene in the OBS scenes list.
 * @param sceneList The liest of OBS scenes
 * @returns The scene data if found. Otherwise, returns null;
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const findScene = (sceneList: any[], sceneTitle: string) => {
	return sceneList.find((scene) => scene.sceneName === sceneTitle);
};
