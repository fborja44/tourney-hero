import Joi from 'joi';
import { JoiIsoDateString } from '.';

const JoiLuckyStatsSessionSchema = Joi.object({
	id: Joi.string().required(),
	createdAt: JoiIsoDateString.required(),
	updatedAt: JoiIsoDateString.required()
});

const JoiLuckyStatsTournamentSchema = Joi.object({
	slug: Joi.string().allow(null),
	name: Joi.string().allow(null)
});

const JoiLuckyStatsPlayerSchema = Joi.object({
	id: Joi.string().allow(null),
	elo: Joi.number().allow(null),
	country: Joi.string().allow(null),
	gamerTag: Joi.string().allow(null),
	luckyRank: Joi.object({
		rank: Joi.number().allow(null),
		points: Joi.number().allow(null)
	}).required(),
	mainCharacter: Joi.number().allow(null),
	primaryRegion: Joi.string().allow(null),
	tournamentCount: Joi.number().allow(null),
	characterOverride: Joi.number().allow(null),
	characterId: Joi.number().allow(null),
	characterName: Joi.string().allow(null),
	regionEmoji: Joi.string().allow(null)
});

const JoiLuckyStatsPlayersSchema = Joi.object({
	left: JoiLuckyStatsPlayerSchema.required(),
	right: JoiLuckyStatsPlayerSchema.required()
});

const JoiLuckyStatsSetSchema = Joi.object({
	id: Joi.string().allow(null),
	winner: Joi.string().valid('player1', 'player2').required(),
	score: Joi.string().allow(null),
	tournamentName: Joi.string().allow(null),
	eventName: Joi.string().allow(null),
	completedAt: JoiIsoDateString.allow(null)
});

const JoiLuckyStatsH2HSchema = Joi.object({
	player1Wins: Joi.number().allow(null),
	player2Wins: Joi.number().allow(null),
	totalSets: Joi.number().allow(null),
	lastPlayedDate: JoiIsoDateString.allow(null),
	recentSets: Joi.array().items(JoiLuckyStatsSetSchema).required()
});

const JoiLuckyStatsWinProbabilitySchema = Joi.object({
	left: Joi.number().allow(null),
	right: Joi.number().allow(null)
});

const JoiLuckyStatsPlayerCardOptionsSchema = Joi.object({
	layout: Joi.string().allow(null),
	showElo: Joi.boolean().required(),
	eloStyle: Joi.string().allow(null),
	logoShape: Joi.string().allow(null),
	showRegion: Joi.boolean().required(),
	colorScheme: Joi.string().allow(null),
	showCharacter: Joi.boolean().required(),
	showLuckyRank: Joi.boolean().required()
});

export const JoiLuckyStatsDataSchema = Joi.object({
	session: JoiLuckyStatsSessionSchema.required(),
	tournament: JoiLuckyStatsTournamentSchema.required(),
	players: JoiLuckyStatsPlayersSchema.required(),
	h2h: JoiLuckyStatsH2HSchema.required(),
	winProbability: JoiLuckyStatsWinProbabilitySchema.required(),
	playerCardOptions: JoiLuckyStatsPlayerCardOptionsSchema.required()
}).required();

export const JoiLuckyStatsMatchupSetSchema = Joi.object({
	id: Joi.string().allow(null),
	winner: Joi.string().valid('player1', 'player2').required(),
	score: Joi.string().allow(null),
	tournamentName: Joi.string().allow(null),
	eventName: Joi.string().allow(null),
	fullRoundText: Joi.string().allow(null),
	completedAt: JoiIsoDateString.allow(null),
	isOnline: Joi.boolean()
});

// From /stream/players
export const JoiLuckyStatsPlayerItemSchema = Joi.object({
	id: Joi.string().allow(null),
	gamerTag: Joi.string().allow(null),
	startgguserId: Joi.string().alphanum().allow(null),
	elo: Joi.number().allow(null),
	country: Joi.string().allow(null),
	primaryRegion: Joi.string().allow(null),
	regionEmoji: Joi.string().allow(null),
	luckyRank: Joi.object({
		rank: Joi.number().allow(null),
		points: Joi.number().allow(null)
	}).required(),
	mainCharacter: Joi.number().allow(null),
	characterId: Joi.number().allow(null),
	characterName: Joi.string().allow(null),
	tournamentCount: Joi.number().allow(null)
});

// Included if two players are used in endpoint
export const JoiLuckyStatsMatchupSchema = Joi.object({
	ok: Joi.boolean(),
	order: Joi.array().items(Joi.string()),
	labels: {
		player1: Joi.string().allow(null),
		player2: Joi.string().allow(null)
	},
	h2h: {
		player1Wins: Joi.number().allow(null),
		player2Wins: Joi.number().allow(null),
		totalSets: Joi.number().allow(null),
		lastPlayedAt: JoiIsoDateString.allow(null),
		firstPlayedAt: JoiIsoDateString.allow(null),
		recentSets: Joi.array().items(JoiLuckyStatsMatchupSetSchema)
	},
	winProbability: {
		glickoOnly: {
			player1: Joi.number().allow(null),
			player2: Joi.number().allow(null)
		},
		blended: {
			player1: Joi.number().allow(null),
			player2: Joi.number().allow(null)
		},
		note: Joi.string().allow(null)
	},
	comparison: {
		ratingDifference: Joi.number().allow(null),
		higherRatedSide: Joi.string().allow(null),
		luckyRankDifference: null,
		betterLuckyRankSide: null,
		careerTotalSets: {
			player1: Joi.number().allow(null),
			player2: Joi.number().allow(null)
		},
		glickoRank: {
			player1: Joi.number().allow(null),
			player2: Joi.number().allow(null)
		}
	},
	matchupMeta: {
		distinctTournaments: Joi.number().allow(null),
		setsOffline: Joi.number().allow(null),
		setsOnline: Joi.number().allow(null),
		avgGameDifferentialPlayer1: null,
		daysSinceLastMatch: null,
		activeWinStreakFromMostRecentSet: null,
		longestWinStreaks: {
			player1: Joi.number().allow(null),
			player2: Joi.number().allow(null)
		}
	},
	estimatedGlickoAfterNextSet: {
		method: Joi.string().allow(null),
		tau: Joi.number().allow(null),
		note: Joi.string().allow(null),
		ifPlayer1Wins: {
			player1: {
				ratingBefore: Joi.number().allow(null),
				ratingAfter: Joi.number().allow(null),
				ratingDelta: Joi.number().allow(null),
				rdBefore: Joi.number().allow(null),
				rdAfter: Joi.number().allow(null),
				volatilityBefore: Joi.number().allow(null),
				volatilityAfter: Joi.number().allow(null)
			},
			player2: {
				ratingBefore: Joi.number().allow(null),
				ratingAfter: Joi.number().allow(null),
				ratingDelta: Joi.number().allow(null),
				rdBefore: Joi.number().allow(null),
				rdAfter: Joi.number().allow(null),
				volatilityBefore: Joi.number().allow(null),
				volatilityAfter: Joi.number().allow(null)
			}
		},
		ifPlayer2Wins: {
			player1: {
				ratingBefore: Joi.number().allow(null),
				ratingAfter: Joi.number().allow(null),
				ratingDelta: Joi.number().allow(null),
				rdBefore: Joi.number().allow(null),
				rdAfter: Joi.number().allow(null),
				volatilityBefore: Joi.number().allow(null),
				volatilityAfter: Joi.number().allow(null)
			},
			player2: {
				ratingBefore: Joi.number().allow(null),
				ratingAfter: Joi.number().allow(null),
				ratingDelta: Joi.number().allow(null),
				rdBefore: Joi.number().allow(null),
				rdAfter: Joi.number().allow(null),
				volatilityBefore: Joi.number().allow(null),
				volatilityAfter: Joi.number().allow(null)
			}
		}
	}
});
