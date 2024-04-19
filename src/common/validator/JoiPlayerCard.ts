import Joi from 'joi';
import { JoiString, JoiTag } from '.';
import {
	MAX_BRACKET_DATA_LENGTH,
	MAX_PRONOUN_LENGTH,
	MAX_TAG_LENGTH,
	MAX_TEAM_LENGTH,
	MAX_TOURNAMENT_NAME_LENGTH,
	MAX_URL_LENGTH
} from '@common/constants/limits';
import { JoiCharacter, JoiScore } from './JoiGameplay';

const JoiPlayerMatch = Joi.object({
	player1Tag: JoiString(MAX_TAG_LENGTH).required(),
	player1Score: JoiScore,
	player2Tag: JoiString(MAX_TAG_LENGTH).required(),
	player2Score: JoiScore,
	roundName: JoiString(MAX_BRACKET_DATA_LENGTH).required()
}).required();

const JoiPlayerPlacement = Joi.object({
	placement: Joi.number().min(0).max(5000).required(),
	iconSrc: JoiString(MAX_URL_LENGTH).required(),
	name: JoiString(MAX_TOURNAMENT_NAME_LENGTH).required()
}).required();

const JoiPlayerCardData = Joi.object({
	id: Joi.number().integer().min(0).required(),
	team: JoiString(MAX_TEAM_LENGTH).required(),
	tag: JoiTag.required(),
	pronoun: JoiString(MAX_PRONOUN_LENGTH).required(),
	country: JoiString().required(),
	state: JoiString().required(),
	twitter: JoiString().required(),
	twitch: JoiString().required(),
	character: JoiCharacter,
	seed: Joi.number().integer().min(0).max(5000).required(),
	matches: Joi.array().items(JoiPlayerMatch).min(0).max(5).required(),
	placements: Joi.array().items(JoiPlayerPlacement).min(0).max(5).required()
});

const JoiPlayerCard = Joi.object({
	showTeamLogo: Joi.boolean().required(),
	player: JoiPlayerCardData.required()
}).required();

export default JoiPlayerCard;
