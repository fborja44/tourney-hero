import { SlippiGame } from '@slippi/slippi-js';
import { dialog } from 'electron';
import fs from 'node:fs';
import path from 'node:path';
import { ReplayData } from '../../common/interfaces/Types';
import { getCharacterFromExternalId } from '../slippi/utils';

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
		const replayData = [];
		fs.readdir(replayDir, (_err, files) => {
			const filePaths = files.filter((el) => path.extname(el) === '.slp');

			// Parse replay metadata
			for (let i = 0; i < Math.min(10, filePaths.length); i++) {
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

				// Not singles
				if (Object.keys(metadata.players).length > 2) {
					continue;
				}

				const replayData: ReplayData = {
					platform: metadata.playedOn,
					fileName: file,
					player1: {
						name: metadata.players?.[0].names?.netplay,
						code: metadata.players?.[0].names?.code,
						stocksRemaining: '',
						characterId: metadata.players?.[0].characters[0],
						port: 'Red',
						winner: false
					},
					player2: {
						name: metadata.players?.[1].names?.netplay,
						code: metadata.players?.[0].names?.code,
						stocksRemaining: '',
						characterId: metadata.players?.[0].characters[0],
						port: 'Red',
						winner: false
					},
					stageId: settings?.stageId,
					date: metadata.startAt ? new Date(metadata.startAt) : undefined,
					lastFrame: metadata.lastFrame
				};
			}
		});
		return { replayDir, replayData };
	}
	return undefined;
};
