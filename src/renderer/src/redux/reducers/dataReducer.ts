import { createReducer } from '@reduxjs/toolkit';
import { OverlayData } from '@renderer/interfaces/Data';
import {
	bracketData,
	commentatorData,
	gameplayData,
	playerCardData
} from '@renderer/data/defaultData';
import {
	setOverlayData,
	updateBracket,
	updateBracketMatch,
	updateCommentators,
	updateGameplay,
	updatePlayer,
	updatePlayerCard
} from '../actions/dataActions';

export const initialState: OverlayData = {
	gameplay: gameplayData,
	commentators: commentatorData,
	bracket: bracketData,
	playerCard: playerCardData
};

const dataReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(setOverlayData, (state, action) => {
			state = { ...state, ...action.payload };
		})
		.addCase(updateGameplay, (state, action) => {
			state.gameplay = {
				...state.gameplay,
				...action.payload
			};
		})
		.addCase(updatePlayer, (state, action) => {
			const { targetPlayer, updatedPlayer } = action.payload;
			state.gameplay[targetPlayer] = {
				...state.gameplay[targetPlayer],
				...updatedPlayer
			};
		})
		.addCase(updateCommentators, (state, action) => {
			state.commentators = {
				...state.commentators,
				...action.payload
			};
		})
		.addCase(updateBracket, (state, action) => {
			state.bracket = action.payload;
		})
		.addCase(updateBracketMatch, (state, action) => {
			const { bracketField, updatedMatch } = action.payload;
			state.bracket[bracketField] = {
				...state.bracket[bracketField],
				...updatedMatch
			};
		})
		.addCase(updatePlayerCard, (state, action) => {
			state.playerCard = {
				...state.playerCard,
				...action.payload
			};
		});
});

export default dataReducer;
