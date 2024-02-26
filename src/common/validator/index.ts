import Joi from 'joi';
import { MAX_TAG_LENGTH } from '../constants/limits';

export const JoiTag = Joi.string().max(MAX_TAG_LENGTH).allow('').required();
export const JoiString = (maxLength: number = 32) => {
	return Joi.string().max(maxLength).allow('').required();
};
export const JoiAlphanum = Joi.string().alphanum().required();
