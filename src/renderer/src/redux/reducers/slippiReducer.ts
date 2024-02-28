import { createReducer } from '@reduxjs/toolkit';
import {
	setAutoSwitchGameToPlayers,
	setAutoSwitchPlayersToGame,
	setGameActive,
	setRelayPort,
	setSlippiConnected
} from '../actions/slippiActions';

export type SlippiState = {
	connected: boolean;
	relayPort: number;
	autoSwitchGameToPlayers: boolean;
	autoSwitchPlayersToGame: boolean;
	gameActive: boolean;
};

const initialState: SlippiState = {
	connected: false,
	relayPort: 51441,
	autoSwitchGameToPlayers: false,
	autoSwitchPlayersToGame: false,
	gameActive: false
};

const obsReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(setSlippiConnected, (state, action) => {
			state.connected = action.payload;
		})
		.addCase(setAutoSwitchGameToPlayers, (state, action) => {
			state.autoSwitchGameToPlayers = action.payload;
		})
		.addCase(setAutoSwitchPlayersToGame, (state, action) => {
			state.autoSwitchPlayersToGame = action.payload;
		})
		.addCase(setRelayPort, (state, action) => {
			state.relayPort = action.payload;
		})
		.addCase(setGameActive, (state, action) => {
			state.gameActive = action.payload;
		});
});

export default obsReducer;
