import { createReducer } from '@reduxjs/toolkit';
import { setLuckyStatsKey } from '../actions/luckyStatsActions';

export type LuckyStatsState = {
	key: string | null; // Will be set ONLY if validated
};

const initialState: LuckyStatsState = {
	key: null
};

const luckyStatsReducer = createReducer(initialState, (builder) => {
	builder.addCase(setLuckyStatsKey, (state, action) => {
		state.key = action.payload;
	});
});

export default luckyStatsReducer;
