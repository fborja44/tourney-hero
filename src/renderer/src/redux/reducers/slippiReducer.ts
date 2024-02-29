import { createReducer } from '@reduxjs/toolkit';
import {
	setAutoSwitchGameToPlayers,
	setAutoSwitchPlayersToGame,
	setActiveGame,
	setRelayPort,
	setSlippiConnected,
	setAutoUpdateScore,
	setPortsValid
} from '../actions/slippiActions';
import { GameStartType } from '@slippi/slippi-js';

export type SlippiState = {
	connected: boolean;
	relayPort: number;
	activeGame: GameStartType | null;
	portsValid: boolean;
	autoSwitchGameToPlayers: boolean;
	autoSwitchPlayersToGame: boolean;
	autoUpdateScore: boolean;
};

const initialState: SlippiState = {
	connected: false,
	relayPort: 51441,
	activeGame: null,
	portsValid: false,
	autoSwitchGameToPlayers: false,
	autoSwitchPlayersToGame: false,
	autoUpdateScore: false
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
		.addCase(setActiveGame, (state, action) => {
			state.activeGame = action.payload;
		})
		.addCase(setAutoUpdateScore, (state, action) => {
			state.autoUpdateScore = action.payload;
		})
		.addCase(setPortsValid, (state, action) => {
			state.portsValid = action.payload;
		});
});

export default obsReducer;
