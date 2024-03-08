import { useDispatch } from 'react-redux';
import useMatches from './useMatches';
import {
	addMatches,
	setMatches,
	setMatchesError,
	setMatchesLoading
} from '@renderer/redux/actions/tournamentActions';

/**
 * Hook to get matches from start.gg.
 * Errors must be set manually.
 */
const useSets = () => {
	const dispatch = useDispatch();
	const { loading, error, fetchMatches, getMoreMatches } = useMatches();

	/**
	 * Fetches the first page of matches from start.gg and sets the match state.
	 */
	const refreshGlobalMatches = async () => {
		const matches = await fetchMatches();
		dispatch(setMatches(matches));
		return matches;
	};

	/**
	 * Gets the next page of matches for the global match state.
	 */
	const getMoreGlobalMatches = async () => {
		const newMatches = await getMoreMatches();
		dispatch(addMatches(newMatches));
	};

	/**
	 * Handle updating global match loading and error state
	 */
	const updateGlobalMatchState = async () => {
		dispatch(setMatchesError(error));
		dispatch(setMatchesLoading(loading));
	};

	return {
		loading,
		error,
		refreshGlobalMatches,
		getMoreGlobalMatches,
		updateGlobalMatchState
	};
};

export default useSets;
