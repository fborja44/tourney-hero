import { ConnectionStatus, GameEndType, GameStartType, SlippiGame } from '@slippi/slippi-js';
import { dialog } from 'electron';
import { SlpLiveStream, SlpRealTime } from '@vinceau/slp-realtime';
import { Subscription } from 'rxjs';

let realtime: SlpRealTime | null = null;
let slippiStream: SlpLiveStream | null = null;

let subscriptions: Subscription | null = null;

/**
 * Event handler to connect to a slippi relay
 * @param ev The electron event
 * @param data The Slippi port data
 */
export const handleConnectToSlippi = async (ev: Electron.IpcMainInvokeEvent, data: string) => {
	subscriptions = new Subscription(); // 🔹 new subscription container each time
	const ADDRESS = '127.0.0.1'; // leave as is for Dolphin or change to "localhost" for a relay on the same computer
	// const PORT = Ports.DEFAULT; // options are DEFAULT, RELAY_START, and LEGACY
	const PORT = JSON.parse(data);

	// Connect to the Slippi livestream
	try {
		const connectionType = 'dolphin';
		slippiStream = new SlpLiveStream(connectionType);
		realtime = new SlpRealTime();
		await slippiStream.start(ADDRESS, PORT);
		console.log('Successfully connected to Slippi');

		slippiStream.connection.on('statusChange', (status: unknown) => {
			if (!slippiStream) return;
			console.log('Status Changed: ', status);
			if (status === ConnectionStatus.CONNECTED) {
				slippiStream.end();
				ev.sender.send('relay-reconnected');
			}
			if (status === ConnectionStatus.DISCONNECTED) {
				slippiStream.end();
				ev.sender.send('relay-disconnected');
			}
		});

		realtime.setStream(slippiStream);

		ev.sender.send('relay-connected');

		// Subscribe to in-game events
		const onGameStart = realtime.game.start$.subscribe((game: GameStartType) => {
			console.log('Game Started');
			console.log(game);
			ev.sender.send('game-start', game);
		});
		subscriptions.add(onGameStart);

		const onGameEnd = realtime.game.end$.subscribe((game: GameEndType) => {
			console.log('Game Ended');
			console.log(game);
			ev.sender.send('game-end', game);
		});
		subscriptions.add(onGameEnd);

		return slippiStream;
	} catch (err) {
		console.error(err);
		ev.sender.send('relay-error');
		return null;
	}
};

export const handleDisconnectFromSlippi = (ev: Electron.IpcMainInvokeEvent) => {
	subscriptions?.unsubscribe();
	subscriptions = null;
	realtime = null;
	slippiStream?.connection.removeAllListeners();
	slippiStream?.end();
	slippiStream = null;
	ev.sender.send('relay-disconnected');
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
