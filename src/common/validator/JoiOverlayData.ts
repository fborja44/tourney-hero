import Joi from 'joi';
import JoiGameplay from './JoiGameplay';
import JoiCommentators from './JoiCommentators';
import JoiBracket from './JoiBracket';
import JoiPlayerCard from './JoiPlayerCard';
import JoiStats from './JoiStats';
import JoiCrewBattle from './JoiCrewBattle';

const JoiOverlayData = Joi.object({
	gameplay: JoiGameplay.required(),
	commentators: JoiCommentators.required(),
	bracket: JoiBracket.required(),
	playerCard: JoiPlayerCard.required(),
	statistics: JoiStats.required(),
	crewBattle: JoiCrewBattle.required()
});

export default JoiOverlayData;
