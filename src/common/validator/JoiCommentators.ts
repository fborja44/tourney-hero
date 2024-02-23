import Joi from 'joi';
import { JoiString, JoiTag } from './index';
import {
	MAX_COMMENTATOR_LENGTH,
	MAX_DAY,
	MAX_MESSAGE_LENGTH,
	MAX_TIMER
} from '@common/constants/limits';

const JoiCommentators = Joi.object({
	commentator1: JoiString(MAX_COMMENTATOR_LENGTH).required(),
	social1: JoiString(MAX_COMMENTATOR_LENGTH).required(),
	commentator2: JoiString(MAX_COMMENTATOR_LENGTH).required(),
	social2: JoiString(MAX_COMMENTATOR_LENGTH).required(),
	commentator3: JoiString(MAX_COMMENTATOR_LENGTH).required(),
	social3: JoiString(MAX_COMMENTATOR_LENGTH).required(),
	showCommentators: Joi.boolean().required(),
	message: JoiString(MAX_MESSAGE_LENGTH).required(),
	showMessage: Joi.boolean().required(),
	player1tag: JoiTag.required(),
	player2tag: JoiTag.required(),
	showMatch: Joi.boolean().required(),
	timerMinutes: Joi.number().min(1).max(MAX_TIMER).integer().required(),
	showTimer: Joi.boolean().required(),
	eventTime: Joi.string().valid('Next', 'Now').required(),
	eventName: Joi.string()
		.regex(/^[a-zA-Z0-9\s\p{P}]+$/u)
		.max(20)
		.required(),
	day: Joi.number().min(0).max(MAX_DAY).integer().required(),
	showEvent: Joi.boolean().required(),
	showAds: Joi.boolean().required()
}).required();

export default JoiCommentators;
