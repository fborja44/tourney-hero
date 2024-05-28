import { combineReducers } from 'redux';
import { OverlayData } from '@common/interfaces/Data';
import dataReducer from './dataReducer';
import tournamentReducer, { TournamentState } from './tournamentReducer';
import scenesReducer, { ScenesState } from './scenesReducer';
import obsReducer, { OBSState } from './obsReducer';
import slippiReducer, { SlippiState } from './slippiReducer';
import replaysReducer, { ReplayState } from './replaysReducer';

export interface AppState {
	dataState: OverlayData;
	tournamentState: TournamentState;
	scenesState: ScenesState;
	obsState: OBSState;
	slippiState: SlippiState;
	replayState: ReplayState;
}

const rootReducer = combineReducers({
	dataState: dataReducer,
	tournamentState: tournamentReducer,
	scenesState: scenesReducer,
	obsState: obsReducer,
	slippiState: slippiReducer,
	replayState: replaysReducer
});

export default rootReducer;
