import { createReducer } from '@reduxjs/toolkit';
import { OverlayData } from '@common/interfaces/Data';
import {
	bracketData,
	commentatorData,
	gameplayData,
	playerCardData,
	statsData
} from '@common/data/defaultData';
import {
	incrementScore,
	setOverlayData,
	updateBracket,
	updateBracketMatch,
	updateCommentators,
	updateGameplay,
	updatePlayer,
	updatePlayerCard,
	updateStats,
	updatedStatsPlayers
} from '../actions/dataActions';

export const initialState: OverlayData = {
	gameplay: gameplayData,
	commentators: commentatorData,
	bracket: bracketData,
	playerCard: playerCardData,
	statistics: statsData
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
		})
		.addCase(updateStats, (state, action) => {
			state.statistics = {
				...state.statistics,
				...action.payload
			};
		})
		.addCase(updatedStatsPlayers, (state, action) => {
			const { targetPlayer, updatedPlayer } = action.payload;
			state.statistics[targetPlayer] = {
				...state.statistics[targetPlayer],
				...updatedPlayer
			};
		})
		.addCase(incrementScore, (state, action) => {
			const targetPlayer = action.payload;
			if (state.gameplay[targetPlayer].score !== null) {
				state.gameplay[targetPlayer] = {
					...state.gameplay[targetPlayer],
					score: (state.gameplay[targetPlayer].score ?? 0) + 1
				};
			}
		});
});

export default dataReducer;
