import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

// Custom APIs for renderer
const api = {
	getFileStats: () => ipcRenderer.invoke('slippi:getFileStats'),
	getReplayDir: () => ipcRenderer.invoke('slippi:selectDir'),
	getCommentators: () => ipcRenderer.invoke('commentator:list'),
	getPlayers: () => ipcRenderer.invoke('player:list')
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
	try {
		contextBridge.exposeInMainWorld('electron', electronAPI);
		contextBridge.exposeInMainWorld('api', api);
		contextBridge.exposeInMainWorld('electronAPI', {
			slippiStream: () => ipcRenderer.send('slippi:connect'),
			slippiDisconnect: () => ipcRenderer.send('slippi:disconnect'),
			addCommentator: () => ipcRenderer.send('commentator:add'),
			updateCommentator: () => ipcRenderer.send('commentator:update'),
			removeCommentator: () => ipcRenderer.send('commentator:remove'),
			importCommentator: () => ipcRenderer.send('commentator:import'),
			exportCommentator: () => ipcRenderer.send('commentator:export'),
			addPlayer: () => ipcRenderer.send('player:add'),
			updatePlayer: () => ipcRenderer.send('player:update'),
			removePlayer: () => ipcRenderer.send('player:remove'),
			importPlayer: () => ipcRenderer.send('player:import'),
			exportPlayer: () => ipcRenderer.send('player:export'),
			getSetStats: () => ipcRenderer.send('slippi:getSetStats')
		});
	} catch (error) {
		console.error(error);
	}
} else {
	// @ts-ignore (define in dts)
	window.electron = electronAPI;
	// @ts-ignore (define in dts)
	window.api = api;
}
