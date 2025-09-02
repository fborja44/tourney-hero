import Joi from 'joi';
import { JoiString, JoiTag } from '.';

const JoiCrewPlayer = Joi.object({
	tag: JoiTag,
	active: Joi.boolean()
});

const JoiCrewBattle = Joi.object({
	showTeams: Joi.boolean().required(),
	team1Name: JoiString().required(),
	team1Players: Joi.array().items(JoiCrewPlayer).required(),
	team2Name: JoiString().required(),
	team2Players: Joi.array().items(JoiCrewPlayer).required()
}).required();

export default JoiCrewBattle;
