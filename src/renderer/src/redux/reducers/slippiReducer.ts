import { createReducer } from '@reduxjs/toolkit';
import {
	setAutoSwitchGameToPlayers,
	setAutoSwitchPlayersToGame,
	setActiveGame,
	setRelayPort,
	setSlippiConnected,
	setAutoUpdateScore,
	setPortsValid,
	setAutomation,
	setAutoUpdateCharacters
} from '../actions/slippiActions';
import { GameStartType } from '@slippi/slippi-js';

export type SlippiState = {
	connected: boolean;
	relayPort: number;
	activeGame: GameStartType | null;
	portsValid: boolean;
	autoSwitchGameToPlayers: boolean;
	autoSwitchPlayersToGame: boolean;
	automate: boolean;
	autoUpdateScore: boolean;
	autoUpdateCharacters: boolean;
};

const initialState: SlippiState = {
	connected: false,
	relayPort: 51441,
	activeGame: null,
	portsValid: false,
	autoSwitchGameToPlayers: false,
	autoSwitchPlayersToGame: false,
	automate: false,
	autoUpdateScore: false,
	autoUpdateCharacters: false
};

const slippiReducer = createReducer(initialState, (builder) => {
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
		.addCase(setAutomation, (state, action) => {
			state.automate = action.payload;
		})
		.addCase(setAutoUpdateScore, (state, action) => {
			state.autoUpdateScore = action.payload;
		})
		.addCase(setAutoUpdateCharacters, (state, action) => {
			state.autoUpdateCharacters = action.payload;
		})
		.addCase(setPortsValid, (state, action) => {
			state.portsValid = action.payload;
		});
});

export default slippiReducer;
