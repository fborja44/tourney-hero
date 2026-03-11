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
	updateOverlayField,
	updatePlayer,
	updatePlayerCard,
	updatePlayerField,
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
		.addCase(updateOverlayField, (state, action) => {
			const { overlay, updatedField } = action.payload;
			switch (overlay) {
				case 'gameplay':
					state.gameplay = {
						...state.gameplay,
						...updatedField
					};
					break;
				case 'commentators':
					state.commentators = {
						...state.commentators,
						...updatedField
					};
					break;
				case 'bracket':
					state.bracket = {
						...state.bracket,
						...updatedField
					};
					break;
				// case 'playerCard':
				// 	state.playerCard = {
				// 		...state.playerCard,
				// 		...updatedField
				// 	};
				// 	break;
				case 'statistics':
					state.statistics = {
						...state.statistics,
						...updatedField
					};
					break;
				case 'crewBattle':
					state.crewBattle = {
						...state.crewBattle,
						...updatedField
					};
					break;
				default:
					break;
			}
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
		.addCase(updatePlayerField, (state, action) => {
			const { targetPlayer, field, value } = action.payload;

			const keys = field.split('.');
			let obj = state.gameplay[targetPlayer];

			keys.forEach((key, i) => {
				if (i === keys.length - 1) {
					obj[key] = value;
				} else {
					obj = obj[key];
				}
			});
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
