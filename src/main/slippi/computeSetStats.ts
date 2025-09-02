import { SlippiGame } from '@slippi/slippi-js';
import path from 'path';

/**
 *
 */
export const handleComputeGameStats = (
	_ev: Electron.IpcMainInvokeEvent,
	replayDir: string,
	fileName: string
) => {
	const replayPath = path.join(replayDir, fileName);
	const replay = new SlippiGame(replayPath);
	return replay.getStats();
};
