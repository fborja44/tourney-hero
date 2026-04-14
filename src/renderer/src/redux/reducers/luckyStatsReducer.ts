import { createReducer } from '@reduxjs/toolkit';
import { setLuckyStatsIsEnabled } from '../actions/luckyStatsActions';

export type LuckyStatsState = {
	// key: string | null; // Will be set ONLY if validated
	isEnabled: boolean;
};

const initialState: LuckyStatsState = {
	isEnabled: true
};

const luckyStatsReducer = createReducer(initialState, (builder) => {
	// builder.addCase(setLuckyStatsKey, (state, action) => {
	// 	state.key = action.payload;
	// }),
	builder.addCase(setLuckyStatsIsEnabled, (state, action) => {
		state.isEnabled = action.payload;
	});
});

export default luckyStatsReducer;
