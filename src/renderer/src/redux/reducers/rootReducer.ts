import { combineReducers } from 'redux';
import { OverlayData } from '@common/interfaces/Data';
import dataReducer from './dataReducer';
import tournamentReducer, { TournamentState } from './tournamentReducer';
import scenesReducer, { ScenesState } from './scenesReducer';
import obsReducer, { OBSState } from './obsReducer';
import slippiReducer, { SlippiState } from './slippiReducer';
import replaysReducer, { ReplayState } from './replaysReducer';
import luckyStatsReducer, { LuckyStatsState } from './luckyStatsReducer';

export interface AppState {
	dataState: OverlayData;
	tournamentState: TournamentState;
	scenesState: ScenesState;
	obsState: OBSState;
	slippiState: SlippiState;
	replayState: ReplayState;
	luckyStatsState: LuckyStatsState;
}

const rootReducer = combineReducers({
	dataState: dataReducer,
	tournamentState: tournamentReducer,
	scenesState: scenesReducer,
	obsState: obsReducer,
	slippiState: slippiReducer,
	replayState: replaysReducer,
	luckyStatsState: luckyStatsReducer
});

export default rootReducer;
