import { Character } from '../../common/interfaces/Types';

export const getCharacterFromExternalId = (id: number): Character => {
	switch (id) {
		case 0:
			return 'Mario';
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
		default: {
			return 'Default';
		}
	}
};

export const getStageFromId = (id: number) => {};

export const parseGamePlayer = (playerIndex: number, players) => {};
