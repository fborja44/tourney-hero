import { createReducer } from '@reduxjs/toolkit';
import { OverlayData } from '@common/interfaces/Data';
import {
	bracketData,
	commentatorData,
	crewBattleData,
	gameplayData,
	playerCardData,
	statsData
} from '@common/data/defaultData';
import {
	incrementScore,
	resetOverlayData,
	setOverlayData,
	toggleCrewPlayerActive,
	updateBracket,
	updateBracketMatch,
	updateCommentators,
	updateCrewBattle,
	updateCrewPlayerTag,
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
	statistics: statsData,
	crewBattle: crewBattleData
};

const dataReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(setOverlayData, (state, action) => {
			state = { ...state, ...action.payload };
		})
		.addCase(resetOverlayData, () => initialState)
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
				console.log(state.gameplay[targetPlayer].score);
			}
		})
		.addCase(updateCrewBattle, (state, action) => {
			state.crewBattle = {
				...state.crewBattle,
				...action.payload
			};
		})
		.addCase(updateCrewPlayerTag, (state, action) => {
			const { targetTeam, index, tag } = action.payload;

			const team = state.crewBattle[targetTeam];
			if (team && team[index]) {
				team[index].tag = tag; // Immer allows mutation here
			}
		})
		.addCase(toggleCrewPlayerActive, (state, action) => {
			const { targetTeam, index } = action.payload;

			const team = state.crewBattle[targetTeam];
			if (team && team[index]) {
				team[index].active = !state.crewBattle[targetTeam][index].active; // Immer allows mutation here
			}
		});
});

export default dataReducer;
