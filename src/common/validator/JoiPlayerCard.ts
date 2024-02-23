import Joi from 'joi';

const JoiPlayerCard = Joi.object({
	showPhoto: Joi.boolean().required(),
	playerTag: Joi.string()
		.regex(/^[a-zA-Z0-9\s\p{P}]+$/u)
		.max(20)
		.required()
}).required();

export default JoiPlayerCard;
