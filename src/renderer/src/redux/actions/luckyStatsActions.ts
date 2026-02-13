import { createAction } from '@reduxjs/toolkit';

// export const setLuckyStatsKey = createAction('SET_LUCKY_STATS_KEY', (key: string | null) => {
// 	return {
// 		payload: key
// 	};
// });

export const setLuckyStatsIsEnabled = createAction(
	'SET_LUCKY_STATS_IS_ENABLED',
	(isEnabled: boolean) => {
		return {
			payload: isEnabled
		};
	}
);
