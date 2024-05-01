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
	setAutoUpdateCharacters,
	setReplayDirectory,
	setReplayList
} from '../actions/slippiActions';
import { GameStartType } from '@slippi/slippi-js';
import { ReplayData } from '@common/interfaces/Types';

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
	replayDir: string;
	replayList: ReplayData[];
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
	autoUpdateCharacters: false,
	replayDir: '',
	replayList: []
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
		})
		.addCase(setReplayDirectory, (state, action) => {
			state.replayDir = action.payload;
		})
		.addCase(setReplayList, (state, action) => {
			state.replayList = action.payload;
		});
});

export default obsReducer;
