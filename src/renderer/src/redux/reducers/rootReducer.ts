import { combineReducers } from 'redux';
import { OverlayData } from '../../interfaces/Data';
import dataReducer from './dataReducer';
import tournamentReducer, { TournamentState } from './tournamentReducer';
// import scenesReducer, { ScenesState } from './scenesReducer';
// import obsReducer, { OBSState } from './obsReducer';
// import slippiReducer, { SlippiState } from './slippiReducer';

export interface AppState {
	dataState: OverlayData;
	tournamentState: TournamentState;
	// scenesState: ScenesState;
	// obsState: OBSState;
	// slippiState: SlippiState;
}

const rootReducer = combineReducers({
	dataState: dataReducer,
	tournamentState: tournamentReducer
	// scenesState: scenesReducer,
	// obsState: obsReducer,
	// slippiState: slippiReducer,
});

export default rootReducer;
