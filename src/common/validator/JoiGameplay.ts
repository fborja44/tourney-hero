import Joi from 'joi';
import { CHARACTERS, PORTS } from '../constants/data';
import { JoiString, JoiTag } from './index';
import {
	MAX_BRACKET_DATA_LENGTH,
	MAX_PRONOUN_LENGTH,
	MAX_SCORE,
	MAX_TEAM_LENGTH
} from '../constants/limits';

export const JoiPlayer = Joi.object({
	tag: JoiTag.required(),
	tagDisplaySize: Joi.number().min(1).max(MAX_SCORE).required(),
	score: Joi.number().min(0).max(MAX_SCORE).integer().allow(null).required(),
	character: Joi.string()
		.valid(...CHARACTERS)
		.required(),
	team: JoiString(MAX_TEAM_LENGTH).required(),
	pronoun: JoiString(MAX_PRONOUN_LENGTH).required(),
	port: Joi.string()
		.valid(...PORTS)
		.required()
}).required();

export const JoiGameplay = Joi.object({
	matchType: JoiString(MAX_BRACKET_DATA_LENGTH).required(),
	roundName: JoiString(MAX_BRACKET_DATA_LENGTH).required(),
	bracketName: JoiString(MAX_BRACKET_DATA_LENGTH).required(),
	eventName: JoiString(MAX_BRACKET_DATA_LENGTH).required(),
	player1: JoiPlayer.required(),
	player2: JoiPlayer.required(),
	showPlayerCamInfo: Joi.boolean().required()
}).required();
