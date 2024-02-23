import { Ports } from '@slippi/slippi-js';
import { dialog } from 'electron';
const { SlpLiveStream, SlpRealTime } = require('@vinceau/slp-realtime');

/**
 * Event handler to connect to a slippi relay
 * @param ev
 */
export const handleConnectToSlippi = async (ev: Electron.IpcMainInvokeEvent) => {
	const ADDRESS = '127.0.0.1'; // leave as is for Dolphin or change to "localhost" for a relay on the same computer
	const PORT = Ports.DEFAULT; // options are DEFAULT, RELAY_START, and LEGACY

	// TODO: Port input
	// Connect to the Slippi livestream
	try {
		const connectionType = 'dolphin';
		const slippiStream = new SlpLiveStream(connectionType);
		const realtime = new SlpRealTime();
		await slippiStream.start(ADDRESS, PORT);
		console.log('Successfully connected to Slippi');

		slippiStream.connection.on('statusChange', (status: unknown) => {
			console.log('Status Changed: ', status);
		});

		realtime.setStream(slippiStream);

		ev.sender.send('relay-connected');

		// Subscribe to in-game events
		realtime.game.start$.subscribe(() => {
			console.log('Game Started');
			ev.sender.send('game-start');
		});

		realtime.game.end$.subscribe(() => {
			console.log('Game Ended');
			ev.sender.send('game-end');
		});
		return slippiStream;
	} catch (err) {
		console.error(err);
		ev.sender.send('relay-error', err);
	}
};

export const handleOpenSlippiFiles = async () => {
	const { canceled, filePaths } = await dialog.showOpenDialog({
		filters: [{ name: 'slippi', extensions: ['slp'] }],
		properties: ['multiSelections']
	});
	if (!canceled) {
		return filePaths;
	}
	return [];
};
