import { useEffect } from 'react';
import useGlobalMatches from './useGlobalMatches';
import { AppState } from '@renderer/redux/reducers/rootReducer';
import { useSelector } from 'react-redux';

const useMatchRefresh = () => {
	const { autoRefresh, tournamentSlug, eventSlug, validated } = useSelector(
		(state: AppState) => state.tournamentState
	);

	const { loading, error, updateGlobalMatchState, refreshGlobalMatches } = useGlobalMatches();

	/**
	 * Handle auto refresh, or load matches on app load.
	 */
	useEffect(() => {
		if (validated) {
			if (autoRefresh) {
				refreshGlobalMatches();
				const interval = setInterval(() => {
					refreshGlobalMatches();
				}, 60 * 1000);
				return () => {
					clearInterval(interval);
				};
			} else {
				refreshGlobalMatches();
			}
		}
		return;
	}, [validated, eventSlug, tournamentSlug, autoRefresh]);

	/**
	 * Handle updating global match loading and error state
	 * ? Review
	 */
	useEffect(() => {
		updateGlobalMatchState();
	}, [loading, error]);

	return null;
};

export default useMatchRefresh;
