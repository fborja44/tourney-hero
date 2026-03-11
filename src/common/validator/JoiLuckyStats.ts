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
