import { bracketData } from '@common/data/defaultData';
import { BracketData, BracketMatch, PlayerCardData } from '@common/interfaces/Data';
import { Match, Entrant, PlayerCardMatch, PlayerCardPlacement } from '@common/interfaces/Types';
import { trimNamePrefix } from './string';
import { getCountryCode } from './location';

/**
 * Generates the authorization header for an API call.
 * @param key The authorization key
 * @returns The authorization header object.
 */
export const generateHeader = (key: string) => {
	return {
		Authorization: `Bearer ${key}`
	};
};

// TODO: Detect bracket type
// TODO: Get character (if applicable)

interface ParsedMatch extends Partial<Match> {
	player1?: Entrant;
	player2?: Entrant;
}

/**
 * Converts query match data into a match object
 * @param matchData Query match data
 * @returns Match data object
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseMatch = async (matchData: any): Promise<ParsedMatch | undefined> => {
	// TODO: Validate data
	let player1: Entrant | undefined = undefined;
	try {
		player1 = await parseSetEntrant(matchData.slots[0]);
	} catch (err) {
		console.error(`Error parsing player 1 for match ${matchData.identifier}`);
		return undefined;
	}
	let player2: Entrant | undefined = undefined;
	try {
		player2 = await parseSetEntrant(matchData.slots[1]);
	} catch (err) {
		console.error(`Error parsing player 2 for match ${matchData.identifier}`);
		return undefined;
	}

	return {
		id: matchData.id,
		identifier: matchData.identifier,
		hasPlaceholder: matchData.hasPlaceholder,
		round: matchData.round,
		roundName: matchData.fullRoundText,
		bracket: {
			name: matchData.phaseGroup.phase.name,
			bestOf: matchData.totalGames
		},
		player1: player1,
		player2: player2,
		startAt: matchData.startAt,
		startedAt: matchData.startedAt ?? null,
		completedAt: matchData.completedAt ?? null,
		winnerId: matchData.winnerId ?? null,
		state: matchData.state ?? 0,
		stream: matchData.stream?.streamName ?? null
	};
};

/**
 * Converts a set slot to a entrant object
 * @param slot Set slot data
 * @returns Entrant data object
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseSetEntrant = async (slot: any): Promise<Entrant> => {
	const standing = slot.standing;
	const entrant = slot.entrant;
	const participants = entrant?.participants;

	let tag = '';
	let prefix = '';
	let pronoun = '';
	let user;
	let image;

	let localPlayerData;
	// Check if one or two participants (singles vs doubles)
	if (participants.length === 1) {
		const participant = participants ? participants[0] : null;
		tag = participant?.gamerTag ?? '';
		prefix = participant?.prefix;
		user = participant?.user;
		pronoun = user?.genderPronoun;
		image = user?.images[0]?.url;

		// Check for local data
		// localPlayerData = await getLocalPlayerData(tag);
	} else if (participants.length === 2) {
		const participant1 = participants ? participants[0] : null;
		const participant2 = participants ? participants[1] : null;
		tag =
			participant1 && participant2
				? `${participant1.gamerTag} / ${participant2.gamerTag}`
				: '';
		prefix =
			participant1 && participant2 && participant1.prefix === participant2.prefix
				? participant1.prefix
				: '' ?? '';
		pronoun = '';
	} else {
		// Skip tag and pronoun
	}

	const player: Entrant = {
		id: entrant.id,
		tag: tag ?? '',
		team: localPlayerData?.team ?? prefix ?? '',
		pronoun: localPlayerData?.pronoun ?? pronoun ?? '',
		imageUrl: image ?? '',
		score: standing?.stats?.score?.value ?? undefined,
		isWinner: standing?.placement === 1,
		character: localPlayerData?.character ?? 'Default'
	};
	return player;
};

/**
 * Parses a player slot in a start.gg set for bracket data.
 * TODO: Joi validator
 * @param match_field
 * @param set
 */
const parsePlayerSlot = (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	set: any,
	index: 0 | 1
): {
	tag: string;
	score: number;
} => {
	const slots = set.slots;
	const player = slots[index]?.entrant;
	const tag = player ? player.name : '';
	const score = player ? slots[index]?.standing?.stats?.score?.value : 0;

	return {
		tag: tag ?? '',
		score: score ?? 0
	};
};

interface Top8Set {
	id: number;
	fullRoundText: string;
	completedAt: number;
	startedAt: number;
	round: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	slots: any[];
}

/**
 * Parses a start.gg set for bracket data
 * @param set
 */
const parseSet = (set: Top8Set): BracketMatch => {
	let p1Data, p2Data;
	try {
		p1Data = parsePlayerSlot(set, 0);
		p2Data = parsePlayerSlot(set, 1);
	} catch (err) {
		console.error('Failed to parse set player data');
	}

	const completed = set.completedAt !== undefined && set.completedAt !== null;
	const started = (set.startedAt !== undefined && set.startedAt !== null) || completed;

	return {
		p1tag: p1Data?.tag ?? '',
		p1score: p1Data?.score ?? 0,
		p2tag: p2Data?.tag ?? '',
		p2score: p2Data?.score ?? 0,
		completed: completed,
		started: started
	};
};

/**
 * Parses sets from a start.gg Top 8 Query
 * TODO: Joi Validator
 * @param sets
 */
export const parseTop8Sets = (sets: Top8Set[]): BracketData => {
	const updatedBracket = {
		...bracketData
	};
	if (!Array.isArray(sets)) {
		console.error('Sets must be an array');
		return updatedBracket;
	}

	let lr1Top = true,
		lqfTop = true,
		wsfTop = true,
		gfReset = false;

	for (const set of sets) {
		switch (set.fullRoundText) {
			case 'Losers Round 1': // Top and Bottom
				if (lr1Top) {
					updatedBracket.lr1Top = parseSet(set);
					lr1Top = false;
				} else {
					updatedBracket.lr1Bottom = parseSet(set);
				}
				break;
			case 'Losers Quarter-Final': // Top and Bottom
				if (lqfTop) {
					updatedBracket.lqfTop = parseSet(set);
					lqfTop = false;
				} else {
					updatedBracket.lqfBottom = parseSet(set);
				}
				break;
			case 'Losers Semi-Final':
				updatedBracket.lsf = parseSet(set);
				break;
			case 'Losers Final':
				updatedBracket.lf = parseSet(set);
				break;
			case 'Winners Semi-Final': // Top and Bottom
				if (wsfTop) {
					updatedBracket.wsfTop = parseSet(set);
					wsfTop = false;
				} else {
					updatedBracket.wsfBottom = parseSet(set);
				}
				break;
			case 'Winners Final':
				updatedBracket.wf = parseSet(set);
				break;
			case 'Grand Final':
				updatedBracket.gf = parseSet(set);
				break;
			case 'Grand Final Reset':
				updatedBracket.gfReset = parseSet(set);
				gfReset = true;
				break;
			default:
				break;
		}
	}
	// If the tournament has no Grand Finals Reset, reset the values
	if (!gfReset) {
		updatedBracket.gfReset = {
			...bracketData.gfReset
		};
	}
	return updatedBracket;
};

/**
 * Converts an event entrant node to a entrant object
 * @param node Entrant node data
 * @returns Entrant data object
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseEventEntrant = async (node: any): Promise<Entrant> => {
	const participants = node?.participants;
	const participant = participants ? participants[0] : null;
	const user = participant?.user;

	// Set team to undefined beforehand to allow for local data
	const prefix = !participant.prefix ? undefined : participant.prefix;

	// TODO: Check for local data
	// const localPlayerData = await getLocalPlayerData(participant.gamerTag);

	const player: Entrant = {
		id: node.id,
		tag: participant.gamerTag ?? '',
		team: prefix ?? '',
		pronoun: user?.genderPronoun ?? '',
		imageUrl: user?.images[0]?.url ?? '',
		character: 'Default'
	};
	return player;
};

/**
 * Converts an event entrant node to a entrant player card data object
 * @param node Entrant node data
 * @returns Entrant player data object
 */
export const parseEventEntrantPlayerData = async (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	entrant: any
): Promise<Partial<PlayerCardData>> => {
	const participants = entrant?.participants;
	const participant = participants ? participants[0] : null;
	const user = participant?.user;

	// Set team to undefined beforehand to allow for local data
	const prefix = !participant.prefix ? undefined : participant.prefix;

	// TODO: Check for local data
	// const localPlayerData = await getLocalPlayerData(participant.gamerTag);

	// Parse match data
	const matches: PlayerCardMatch[] = entrant.paginatedSets.nodes.map((match) => ({
		player1Tag: trimNamePrefix(match.slots[0].entrant?.name) ?? 'Unknown',
		player1Score: match.slots[0].standing?.stats?.score?.value || 0,
		player2Tag: trimNamePrefix(match.slots[1].entrant?.name) ?? 'Unknown',
		player2Score: match.slots[0].standing?.stats?.score?.value || 0,
		roundName: match.fullRoundText
	}));

	// Parse placement data
	let placements: PlayerCardPlacement[] = [];
	if (user) {
		console.log(user.tournaments);
		placements = user.tournaments.nodes.map((tournament) => ({
			placement: 5,
			iconSrc: tournament.images ? tournament.images[0]?.url ?? '' : '',
			name: tournament.name
		}));
	}

	const twitter =
		user?.authorizations?.find((social) => social.type === 'TWITTER')?.externalUsername ?? '';
	const twitch =
		user?.authorizations?.find((social) => social.type === 'TWITCH')?.externalUsername ?? '';

	const player: Partial<PlayerCardData> = {
		id: entrant.id,
		tag: participant.gamerTag ?? entrant.name ?? '',
		team: prefix ?? '',
		pronoun: user?.genderPronoun ?? '',
		twitter: twitter,
		twitch: twitch,
		seed: entrant.initialSeedNum ?? 0,
		matches: matches,
		placements: placements,
		countryCode: user?.location?.country ? getCountryCode(user?.location.country) : ''
		// state: user?.location.state ?? ''
	};
	return player;
};

/**
 * Helper function to compare matches to sort
 * @param a The first match to compare
 * @param b The second match to compare
 * @returns The comparison value, where started matches are first, then waiting matches, then completed matches
 */
const compareMatches = (a: Match, b: Match): number => {
	if (a.stream !== null && b.stream !== null) {
		// Both matches are on stream
		return 0;
	} else if (a.stream !== null) {
		return -1;
	} else if (b.stream !== null) {
		return 1;
	} else if (a.completedAt !== null && b.completedAt !== null) {
		// Both matches are completed
		return b.completedAt - a.completedAt;
	} else if (a.state === 3) {
		// Only match 'a' is completed
		return 1;
	} else if (b.state === 3) {
		// Only match 'b' is completed
		return 1; // Don't care about order of completed matches
	} else if (a.state === 2) {
		// Only match 'a' is started
		return -1;
	} else if (b.state === 2) {
		// Only match 'b' is started
		return 1;
	} else {
		// Both matches are waiting
		return a.identifier.localeCompare(b.identifier);
	}
};

/**
 * Sorts a list of matches.
 * Does NOT modify the original array (not in-place)
 * @param matches The list of matches to sort
 * @returns The sorted list of matches
 */
export const sortMatches = (matches: Match[]): Match[] => {
	const sortedMatches = [...matches];
	return sortedMatches.sort(compareMatches);
};

/**
 * Finds the number of rounds that must be won depending on the match format
 * @param bestOf The match format (ex. best of 5)
 * @returns The target number of rounds to win
 */
export const getTargetWins = (bestOf: number): number => {
	if (typeof bestOf !== 'number' || bestOf % 2 === 0) {
		throw new Error('Best Of must be an odd number');
	}

	return Math.ceil(bestOf / 2);
};
