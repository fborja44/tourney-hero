import { GameEndType, GameStartType, SlippiGame } from '@slippi/slippi-js';
import { dialog } from 'electron';
const { SlpLiveStream, SlpRealTime } = require('@vinceau/slp-realtime');

/**
 * Event handler to connect to a slippi relay
 * @param ev The electron even
 * @param data The Slippi port data
 */
export const handleConnectToSlippi = async (ev: Electron.IpcMainInvokeEvent, data: string) => {
	const ADDRESS = '127.0.0.1'; // leave as is for Dolphin or change to "localhost" for a relay on the same computer
	// const PORT = Ports.DEFAULT; // options are DEFAULT, RELAY_START, and LEGACY
	const PORT = JSON.parse(data);

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
		realtime.game.start$.subscribe((game: GameStartType) => {
			console.log('Game Started');
			console.log(game);
			ev.sender.send('game-start', game);
		});

		realtime.game.end$.subscribe((game: GameEndType) => {
			console.log('Game Ended');
			console.log(game);
			ev.sender.send('game-end', game);
		});
		return slippiStream;
	} catch (err) {
		console.error(err);
		ev.sender.send('relay-error');
	}
};

export const handleSlippiFileStats = async () => {
	const { canceled, filePaths } = await dialog.showOpenDialog({
		filters: [{ name: 'slippi', extensions: ['slp'] }],
		properties: ['multiSelections']
	});
	if (!canceled) {
		for (const file of filePaths) {
			const game = new SlippiGame(file);
			const stats = game.getStats();
			console.log(stats);
		}
		return filePaths;
	}
	return [];
};
