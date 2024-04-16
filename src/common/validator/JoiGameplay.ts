import Joi from 'joi';
import { CHARACTERS, PORTS } from '../constants/data';
import { JoiString, JoiTag } from './index';
import {
	MAX_BRACKET_DATA_LENGTH,
	MAX_PRONOUN_LENGTH,
	MAX_SCORE,
	MAX_TEAM_LENGTH
} from '../constants/limits';

export const JoiScore = Joi.number().min(0).max(MAX_SCORE).integer().allow(null);

export const JoiScores = Joi.object({
	p1score: JoiScore.required(),
	p2score: JoiScore.required()
}).required();

export const JoiCharacter = Joi.string()
	.valid(...CHARACTERS)
	.required();

export const JoiCharacters = Joi.object({
	p1character: JoiCharacter.required(),
	p2character: JoiCharacter.required()
}).required();

export const JoiPlayer = Joi.object({
	tag: JoiTag.required(),
	tagDisplaySize: Joi.number().min(1).max(MAX_SCORE).required(),
	score: JoiScore.required(),
	character: JoiCharacter,
	team: JoiString(MAX_TEAM_LENGTH).required(),
	pronoun: JoiString(MAX_PRONOUN_LENGTH).required(),
	port: Joi.string()
		.valid(...PORTS)
		.required()
}).required();

const JoiGameplay = Joi.object({
	matchType: JoiString(MAX_BRACKET_DATA_LENGTH).required(),
	roundName: JoiString(MAX_BRACKET_DATA_LENGTH).required(),
	bracketName: JoiString(MAX_BRACKET_DATA_LENGTH).required(),
	eventName: JoiString(MAX_BRACKET_DATA_LENGTH).required(),
	infoMsg: JoiString(MAX_BRACKET_DATA_LENGTH).required(),
	showCommentators: Joi.boolean().required(),
	player1: JoiPlayer.required(),
	player2: JoiPlayer.required(),
	showPlayerCamInfo: Joi.boolean().required()
}).required();

export default JoiGameplay;
