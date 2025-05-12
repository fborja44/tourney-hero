import Joi from 'joi';
import { JoiString, JoiTag } from '.';

const JoiCrewPlayer = Joi.object({
	tag: JoiTag,
	active: Joi.boolean()
});

const JoiCrewBattle = Joi.object({
	showTeams: Joi.boolean(),
	team1Name: JoiString(),
	team1Players: Joi.array().items(JoiCrewPlayer),
	team2Name: JoiString(),
	team2Players: Joi.array().items(JoiCrewPlayer)
}).required();

export default JoiCrewBattle;
