import { app, shell, BrowserWindow, ipcMain, nativeTheme, session } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/app-logo.png?asset';
import { handleConnectToSlippi, handleSlippiFileStats } from './events/slippi';
import {
	handleAddLocalCommentator,
	handleDeleteLocalCommentator,
	handleGetCommentatorsList
} from './store';

function createWindow(): void {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		height: 650,
		width: 1200,
		minHeight: 600,
		minWidth: 1060, // TODO: Change for responsive single column layout
		show: false,
		autoHideMenuBar: true,
		icon: icon,
		webPreferences: {
			preload: join(__dirname, '../preload/index.js'),
			sandbox: false
		}
	});

	mainWindow.on('ready-to-show', () => {
		nativeTheme.themeSource = 'dark';
		mainWindow.show();
	});

	mainWindow.webContents.setWindowOpenHandler((details) => {
		shell.openExternal(details.url);
		return { action: 'deny' };
	});

	// HMR for renderer base on electron-vite cli.
	// Load the remote URL for development or the local html file for production.
	if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
		mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
	} else {
		mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
	}
}

// Define Content Security Policy
app.on('ready', () => {
	session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
		callback({
			responseHeaders: Object.assign(
				{
					'Content-Security-Policy': [
						"default-src 'self'",
						"style-src 'self' 'unsafe-inline'", // ! Without unsafe-inline, breaks Fluent-UI
						"script-src 'self' 'unsafe-inline'",
						"connect-src 'self' http://127.0.0.1:3001 ws://127.0.0.1:3001 ws://127.0.0.1:4455 https://api.start.gg/gql/alpha", // Allow connections to localhost and start.gg
						"img-src 'self' data: https://images.start.gg"
					].join('; ')
				},
				details.responseHeaders
			)
		});
	});
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	// Set app user model id for windows
	electronApp.setAppUserModelId('com.electron');

	// Default open or close DevTools by F12 in development
	// and ignore CommandOrControl + R in production.
	// see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
	app.on('browser-window-created', (_, window) => {
		optimizer.watchWindowShortcuts(window);
	});

	// IPC test
	ipcMain.on('ping', () => console.log('pong'));

	// Register IPC handlers
	ipcMain.on('slippi:connect', handleConnectToSlippi);

	ipcMain.handle('slippi:getFileStats', handleSlippiFileStats);

	// Local Data
	ipcMain.handle('commentator:list', handleGetCommentatorsList);
	ipcMain.handle('commentator:add', handleAddLocalCommentator);
	ipcMain.handle('commentator:remove', handleDeleteLocalCommentator);

	createWindow();

	app.on('activate', function () {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
