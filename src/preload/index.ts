import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

// Custom APIs for renderer
const api = {
	getFileStats: () => ipcRenderer.invoke('slippi:getFileStats'),
	getCommentators: () => ipcRenderer.invoke('commentator:list'),
	addCommentator: () => ipcRenderer.invoke('commentator:add'),
	deleteCommentator: () => ipcRenderer.invoke('commentator:delete')
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
	try {
		contextBridge.exposeInMainWorld('electron', electronAPI);
		contextBridge.exposeInMainWorld('api', api);
		contextBridge.exposeInMainWorld('electronAPI', {
			slippiStream: () => ipcRenderer.send('slippi:connect')
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
