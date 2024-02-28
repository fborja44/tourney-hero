import { Character } from '@common/interfaces/Types';
import { PlacementType } from '@slippi/slippi-js';

/**
 * Gets the string representation of a Slippi game port.
 * @param port The Slippi port number
 */
export const getSlippiPort = (port: number) => {
	switch (port) {
		case 0:
			return 'Red';
		case 1:
			return 'Blue';
		case 2:
			return 'Green';
		case 3:
			return 'Yellow';
		default:
			return 'None';
	}
};

/**
 * Gets the string representation of a Slippi character ID.
 * @param characterId The Slippi character ID
 */
export const getSlippiCharacter = (characterId: number): Character => {
	switch (characterId) {
		case 0:
			return 'CaptainFalcon';
		case 1:
			return 'DonkeyKong';
		case 2:
			return 'Fox';
		case 3:
			return 'MrGameWatch';
		case 4:
			return 'Kirby';
		case 5:
			return 'Bowser';
		case 6:
			return 'Link';
		case 7:
			return 'Luigi';
		case 8:
			return 'Mario';
		case 9:
			return 'Marth';
		case 10:
			return 'Mewtwo';
		case 11:
			return 'Ness';
		case 12:
			return 'Peach';
		case 13:
			return 'Pikachu';
		case 14:
			return 'IceClimbers';
		case 15:
			return 'Jigglypuff';
		case 16:
			return 'Samus';
		case 17:
			return 'Yoshi';
		case 18:
			return 'Zelda';
		case 19:
			return 'Sheik';
		case 20:
			return 'Falco';
		case 21:
			return 'YoungLink';
		case 22:
			return 'DrMario';
		case 23:
			return 'Roy';
		case 24:
			return 'Pichu';
		case 25:
			return 'Ganondorf';
		default:
			return 'Default';
	}
};

/**
 * Gets the port placement of the winner.
 * Singles (1v1) only.
 * @param placements
 */
export const getWinnerPort = (placements: PlacementType[]) => {
	const winnerIndex = placements.find((player) => player.position === 0)?.playerIndex ?? -1;
	return getSlippiPort(winnerIndex);
};
