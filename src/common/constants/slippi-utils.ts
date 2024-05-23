import { Character, ReplayPlayer } from '@common/interfaces/Types';
import { FrameEntryType, MetadataType, PlacementType } from '@slippi/slippi-js';

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
 * Gets the string representation of a Slippi Internal Character ID.
 * @param characterId The Slippi character ID
 */
export const getSlippiCharacter = (characterId: number): Character => {
	switch (characterId) {
		case 0:
			return 'Mario';
		case 1:
			return 'Fox';
		case 2:
			return 'CaptainFalcon';
		case 3:
			return 'DonkeyKong';
		case 4:
			return 'Kirby';
		case 5:
			return 'Bowser';
		case 6:
			return 'Link';
		case 7:
			return 'Sheik';
		case 8:
			return 'Ness';
		case 9:
			return 'Peach';
		case 10:
			return 'IceClimbers';
		case 11:
			return 'IceClimbers';
		case 12:
			return 'Pikachu';
		case 13:
			return 'Samus';
		case 14:
			return 'Yoshi';
		case 15:
			return 'Jigglypuff';
		case 16:
			return 'Mewtwo';
		case 17:
			return 'Luigi';
		case 18:
			return 'Marth';
		case 19:
			return 'Zelda';
		case 20:
			return 'YoungLink';
		case 21:
			return 'DrMario';
		case 22:
			return 'Falco';
		case 23:
			return 'Pichu';
		case 24:
			return 'MrGameWatch';
		case 25:
			return 'Ganondorf';
		default:
			return 'Roy';
	}
};

/**
 * Gets the string representation of a Slippi Internal Stage ID.
 * @param stageId The Slippi stage ID
 */
export const getSlippiStage = (stageId: number) => {
	switch (stageId) {
		case 2:
			return 'Fountain of Dreams';
		case 3:
			return 'Pokémon Stadium';
		case 4:
			return "Princess Peach's Castle";
		case 5:
			return 'Kongo Jungle';
		case 6:
			return 'Brinstar';
		case 7:
			return 'Corneria';
		case 8:
			return "Yoshi's Story";
		case 9:
			return 'Onett';
		case 10:
			return 'Mute City';
		case 11:
			return 'Rainbow Cruise';
		case 12:
			return 'Jungle Japes';
		case 13:
			return 'Great Bay';
		case 14:
			return 'Hyrule Temple';
		case 15:
			return 'Brinstar Depths';
		case 16:
			return "Yoshi's Island";
		case 17:
			return 'Green Greens';
		case 18:
			return 'Fourside';
		case 19:
			return 'Mushroom Kingdom I';
		case 20:
			return 'Mushroom Kingdom II';
		case 22:
			return 'Venom';
		case 23:
			return 'Poké Floats';
		case 24:
			return 'Big Blue';
		case 25:
			return 'Icicle Mountain';
		case 26:
			return 'Icetop';
		case 27:
			return 'Flat Zone';
		case 28:
			return 'Dream Land N64';
		case 29:
			return "Yoshi's Island N64";
		case 30:
			return 'Kongo Jungle N64';
		case 31:
			return 'Battlefield';
		case 32:
			return 'Final Destination';
		default:
			return 'Unknown Stage';
	}
};

/**
 * Gets the port placement of the winner.
 * Singles (1v1) only.
 * @param placements
 * @returns The numbered port of the player if found. Otherwise, returns -1 (ties, etc).
 */
export const getWinnerPort = (placements: PlacementType[]) => {
	const winnerIndex = placements.find((player) => player.position === 0)?.playerIndex ?? -1;
	return winnerIndex !== undefined ? getSlippiPort(winnerIndex) : -1;
};

export const parseSlippiPlayers = (
	metadata: MetadataType,
	winners: PlacementType[],
	lastFrame: FrameEntryType | null
) => {
	if (!metadata.players) {
		return [];
	}

	// Get winner port
	const winnerPort = getWinnerPort(winners);
	
	// Convert players object to array
	const players: ReplayPlayer[] = Object.keys(metadata.players).map((key) => {
		const player = metadata.players?.[key];
		const port = getSlippiPort(parseInt(key));
		const stocksRemaining = lastFrame?.players[key].post.stocksRemaining;
		return {
			name: player.names?.netplay,
			code: player.names?.code,
			stocksRemaining: stocksRemaining,
			characterId: parseInt(Object.keys(player.characters)[0]),
			port: port,
			winner: port === winnerPort
		};
	});

	return players;
};
