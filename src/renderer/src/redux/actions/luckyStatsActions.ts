import { createAction } from '@reduxjs/toolkit';

export const setLuckyStatsKey = createAction('SET_LUCKY_STATS_KEY', (key: string | null) => {
	return {
		payload: key
	};
});
