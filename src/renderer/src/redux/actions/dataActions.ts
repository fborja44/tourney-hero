import { createAction } from '@reduxjs/toolkit';
import {
	BracketData,
	BracketMatch,
	CommentatorData,
	GameplayData,
	OverlayData,
	PlayerCardData,
	PlayerData,
	StatsData
} from '@common/interfaces/Data';

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
