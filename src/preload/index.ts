import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

// Custom APIs for renderer
const api = {
	getFileStats: () => ipcRenderer.invoke('slippi:getFileStats'),
	getDir: () => ipcRenderer.invoke('dir:select'),
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
			addCommentator: () => ipcRenderer.send('commentator:add'),
			updateCommentator: () => ipcRenderer.send('commentator:update'),
			removeCommentator: () => ipcRenderer.send('commentator:remove'),
			addPlayer: () => ipcRenderer.send('player:add'),
			updatePlayer: () => ipcRenderer.send('player:update'),
			removePlayer: () => ipcRenderer.send('player:remove')
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
