import { FrameEntryType, MetadataType, PlacementType } from '@slippi/slippi-js';
import { SLIPPI_CHARACTERS, SLIPPI_STAGES } from './data';
import { Character, ReplayPlayer, SlippiCharacter } from '../interfaces/Types';

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
 * Gets character data by Internal Character ID.
 * @param internalId The Slippi character internal ID
 */
export const getSlippiCharacterData = (
	internalId: number | string | undefined
): SlippiCharacter | null => {
	if (typeof internalId === 'string') {
		internalId = parseInt(internalId);
	}

	return SLIPPI_CHARACTERS.find((character) => character.internalId === internalId) ?? null;
};

/**
 * Gets the string representation of a Slippi Internal Character ID.
 * @param characterId The Slippi character ID
 */
export const getSlippiCharacterByInternalId = (
	characterId: number | string | undefined
): Character => {
	if (typeof characterId === 'string') {
		characterId = parseInt(characterId);
	}

	return (
		SLIPPI_CHARACTERS.find((character) => character.internalId === characterId)?.name ??
		'Default'
	);
};

/**
 * Gets the string representation of a Slippi Internal Character ID.
 * @param characterId The Slippi character ID
 */
export const getSlippiCharacterByExternalId = (
	characterId: number | string | undefined
): Character => {
	if (typeof characterId === 'string') {
		characterId = parseInt(characterId);
	}

	return (
		SLIPPI_CHARACTERS.find((character) => character.externalId === characterId)?.name ??
		'Default'
	);
};

/**
 * Gets the string representation of a Slippi External Stage ID.
 * @param stageId The Slippi Stage ID
 */
export const getSlippiStage = (stageId: number) => {
	return SLIPPI_STAGES.find((stage) => stage.externalId === stageId)?.name ?? 'Unknown Stage';
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
