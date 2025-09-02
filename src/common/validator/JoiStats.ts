import Joi from 'joi';
import { JoiPlayer } from './JoiGameplay';

const JoiStats = Joi.object({
	player1: JoiPlayer.required(),
	player2: JoiPlayer.required(),
}).required();

export default JoiStats;
