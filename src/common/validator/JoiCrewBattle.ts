import Joi from 'joi';
import { JoiString, JoiTag } from '.';

const JoiTeamPlayer = Joi.object({
	tag: JoiTag,
	active: Joi.boolean()
});

const JoiStats = Joi.object({
	showTeams: Joi.boolean(),
	team1Name: JoiString(),
	team1Tags: Joi.array().items(JoiTeamPlayer),
	team2Name: JoiString(),
	team2Tags: Joi.array().items(JoiTeamPlayer)
}).required();

export default JoiStats;
