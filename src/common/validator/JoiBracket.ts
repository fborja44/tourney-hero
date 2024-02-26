import Joi from 'joi';
import { JoiTag } from './index';
import { MAX_SCORE } from '../constants/limits';

const JoiScore = Joi.number().min(-1).max(MAX_SCORE);

const JoiMatch = Joi.object({
	p1tag: JoiTag.required(),
	p2tag: JoiTag.required(),
	p1score: JoiScore,
	p2score: JoiScore,
	completed: Joi.boolean().required(),
	started: Joi.boolean().required()
}).required();

const JoiBracket = Joi.object({
	lr1Top: JoiMatch.required(),
	lr1Bottom: JoiMatch.required(),
	wsfTop: JoiMatch.required(),
	wsfBottom: JoiMatch.required(),
	lqfTop: JoiMatch.required(),
	lqfBottom: JoiMatch.required(),
	wf: JoiMatch.required(),
	lsf: JoiMatch.required(),
	lf: JoiMatch.required(),
	gf: JoiMatch.required(),
	gfReset: JoiMatch.required()
}).required();

export default JoiBracket;
