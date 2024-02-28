import { createReducer } from '@reduxjs/toolkit';
import {
	setAutoSwitchGameToPlayers,
	setAutoSwitchPlayersToGame,
	setActiveGame,
	setRelayPort,
	setSlippiConnected
} from '../actions/slippiActions';
import { GameStartType } from '@slippi/slippi-js';

export type SlippiState = {
	connected: boolean;
	relayPort: number;
	autoSwitchGameToPlayers: boolean;
	autoSwitchPlayersToGame: boolean;
	activeGame: GameStartType | null;
};

const initialState: SlippiState = {
	connected: false,
	relayPort: 51441,
	autoSwitchGameToPlayers: false,
	autoSwitchPlayersToGame: false,
	activeGame: null
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
		});
});

export default obsReducer;
