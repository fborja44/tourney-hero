import { SlippiGame } from '@slippi/slippi-js';
import { dialog } from 'electron';
import fs from 'node:fs';
import path from 'node:path';
import { ReplayData } from '../../common/interfaces/Types';
import { parseSlippiPlayers } from '../../common/constants/slippi-utils';

const readReplayDir = (replayDir: string) => {
	// TODO: Decouple/parse on separate thread
	return new Promise((resolve) => {
		fs.readdir(replayDir, (_err, files) => {
			const filePaths = files.filter((el) => path.extname(el) === '.slp');
			const replayData: ReplayData[] = [];
			const replayNum = filePaths.length;

			// Parse replay metadata for 10 most recent replays
			for (let i = replayNum - 1; i > replayNum - Math.min(10, replayNum) - 1; i--) {
				const file = filePaths[i];
				const replayPath = path.join(replayDir, file);
				const replay = new SlippiGame(replayPath);
				const metadata = replay.getMetadata();
				const settings = replay.getSettings();
				const winners = replay.getWinners();
				const lastFrame = replay.getLatestFrame();

				// Missing data
				if (!metadata || !metadata.players) {
					continue;
				}

				// Check if singles match
				if (Object.keys(metadata.players).length > 2) {
					continue;
				}

				try {
					const players = parseSlippiPlayers(metadata, winners, lastFrame);
					const data: ReplayData = {
						platform: metadata.playedOn,
						fileName: file,
						player1: players[0],
						player2: players[1],
						stageId: settings?.stageId ?? -1,
						date: metadata.startAt ? new Date(metadata.startAt) : undefined,
						lastFrame: metadata.lastFrame
					};
					replayData.push(data);
				} catch (err) {
					console.error(`Failed to parse replay '${file}'`, err);
				}
			}
			resolve(replayData);
		});
	});
};

/**
 * Event handler to select a directory
 * @param ev The electron event
 * @param data The
 */
export const handleSelectReplayDir = async () => {
	const result = await dialog.showOpenDialog({
		properties: ['openDirectory']
	});
	if (!result.canceled) {
		const replayDir = result.filePaths[0];
		const replayData = await readReplayDir(replayDir);
		return { replayDir, replayData };
	}
	return undefined;
};
