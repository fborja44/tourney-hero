import { createAction } from '@reduxjs/toolkit';
import { GameStartType } from '@slippi/slippi-js';

export const setSlippiConnected = createAction('SET_SLIPPI_STATUS', (connected: boolean) => {
	return {
		payload: connected
	};
});

export const setAutoSwitchGameToPlayers = createAction(
	'SET_AUTO_SWITCH_GAME_TO_PLAYERS',
	(value: boolean) => {
		return {
			payload: value
		};
	}
);

export const setAutoSwitchPlayersToGame = createAction(
	'SET_AUTO_SWITCH_PLAYERS_TO_GAME',
	(value: boolean) => {
		return {
			payload: value
		};
	}
);

export const setRelayPort = createAction('SET_RELAY_PORT', (port: number) => {
	return {
		payload: port
	};
});

export const setActiveGame = createAction('SET_ACTIVE_GAME', (game: GameStartType | null) => {
	return {
		payload: game
	};
});

export const setAutomation = createAction('SET_AUTOMATION', (value: boolean) => {
	return {
		payload: value
	};
});

export const setAutoUpdateScore = createAction('SET_AUTO_UPDATE_SCORE', (value: boolean) => {
	return {
		payload: value
	};
});

export const setAutoUpdateCharacters = createAction(
	'SET_AUTO_UPDATE_CHARACTERS',
	(value: boolean) => {
		return {
			payload: value
		};
	}
);

export const setPortsValid = createAction('SET_PORTS_VALID', (value: boolean) => {
	return {
		payload: value
	};
});
