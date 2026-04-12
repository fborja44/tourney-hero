import { createAction } from '@reduxjs/toolkit';
import {
	BracketData,
	BracketMatch,
	CommentatorData,
	CrewBattleData,
	DisplayData,
	GameplayData,
	HeadData,
	OverlayData,
	PlayerCardData,
	PlayerData,
	StatsData
} from '@common/interfaces/Data';
import { LuckyStatsMatchup } from '@common/interfaces/ApiData';

export const setOverlayData = createAction('SET_DATA', (newOverlayData: OverlayData) => {
	return {
		payload: newOverlayData
	};
});

export const resetOverlayData = createAction('RESET_OVERLAY_DATA', () => {
	return {
		payload: true
	};
});

export const updateOverlayField = createAction(
	'UPDATE_OVERLAY_FIELD',
	(overlay: keyof OverlayData, updatedField: Partial<DisplayData>) => {
		return {
			payload: { overlay, updatedField }
		};
	}
);

export const updateGameplay = createAction(
	'UPDATE_GAMEPLAY',
	(updatedGameplay: Partial<GameplayData>) => {
		return {
			payload: updatedGameplay
		};
	}
);

export const incrementScore = createAction(
	'INCREMENT_SCORE',
	(targetPlayer: 'player1' | 'player2') => {
		return {
			payload: targetPlayer
		};
	}
);

export const updatePlayer = createAction(
	'UPDATE_PLAYER',
	(targetPlayer: 'player1' | 'player2', updatedPlayer: Partial<PlayerData>) => {
		return {
			payload: { targetPlayer, updatedPlayer }
		};
	}
);

export const updatePlayerField = createAction(
	'UPDATE_PLAYER_FIELD',
	(
		targetPlayer: 'player1' | 'player2',
		field: string,
		value: string | number | HeadData[] | boolean | null
	) => {
		return {
			payload: { targetPlayer, field, value }
		};
	}
);

export const updateCommentators = createAction(
	'UPDATE_COMMENTATORS',
	(updatedCommentators: Partial<CommentatorData>) => {
		return {
			payload: updatedCommentators
		};
	}
);

export const updateBracket = createAction('SET_BRACKET', (updatedBracket: BracketData) => {
	return {
		payload: updatedBracket
	};
});

export const updateBracketMatch = createAction(
	'UPDATE_BRACKET_MATCH',
	(bracketField: keyof BracketData, updatedMatch: Partial<BracketMatch>) => {
		return {
			payload: { bracketField, updatedMatch }
		};
	}
);

export const updatePlayerCard = createAction(
	'UPDATE_PLAYER_CARD',
	(updatedPlayerCard: Partial<PlayerCardData>) => {
		return {
			payload: updatedPlayerCard
		};
	}
);

export const updateStats = createAction('UPDATE_STATS', (updatedStats: Partial<StatsData>) => {
	return {
		payload: updatedStats
	};
});

export const updatedStatsPlayers = createAction(
	'UPDATE_STATS_PLAYER',
	(targetPlayer: 'player1' | 'player2', updatedPlayer: Partial<PlayerData>) => {
		return {
			payload: { targetPlayer, updatedPlayer }
		};
	}
);

export const updateCrewBattle = createAction(
	'UPDATE_CREW_BATTLE',
	(updatedCrewBattle: Partial<CrewBattleData>) => {
		return {
			payload: updatedCrewBattle
		};
	}
);

export const updateCrewPlayerTag = createAction(
	'UPDATE_CREW_PLAYER_TAG',
	(targetTeam: 'team1Players' | 'team2Players', index: number, tag: string) => {
		return {
			payload: { targetTeam, index, tag }
		};
	}
);

export const toggleCrewPlayerActive = createAction(
	'TOGGLE_CREW_PLAYER_ACTIVE',
	(targetTeam: 'team1Players' | 'team2Players', index: number) => {
		return {
			payload: { targetTeam, index }
		};
	}
);

export const setLuckyStatsMatchup = createAction(
	'SET_LUCKY_STATS_MATCHUP',
	(data: LuckyStatsMatchup | null) => {
		return {
			payload: data
		};
	}
);
