import { createAction } from '@reduxjs/toolkit';

export const setSlippiConnected = createAction(
	'SET_SLIPPI_STATUS',
	(connected: boolean) => {
		return {
			payload: connected,
		};
	}
);

export const setAutoSwitchGameToPlayers = createAction(
	'SET_AUTO_SWITCH_GAME_TO_PLAYERS',
	(value: boolean) => {
		return {
			payload: value,
		};
	}
);

export const setAutoSwitchPlayersToGame = createAction(
	'SET_AUTO_SWITCH_PLAYERS_TO_GAME',
	(value: boolean) => {
		return {
			payload: value,
		};
	}
);

export const setRelayPort = createAction('SET_RELAY_PORT', (port: number) => {
	return {
		payload: port,
	};
});
