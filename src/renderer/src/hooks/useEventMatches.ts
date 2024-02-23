import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../redux/reducers/rootReducer';
import matchesQuery from '../graphql/queries/matchesQuery';
import useQuery from './useQuery';
import {
	addMatches,
	setMatches,
	setMatchesError,
	setMatchesLoading
} from '../redux/actions/tournamentActions';
import { parseMatch } from '../utils/tournament';
import { Match } from '@common/interfaces/Types';
import { useState } from 'react';
/**
 * Start.gg API Query hook.
 * Errors must be set manually.
 */
const useMatch = () => {
	const dispatch = useDispatch();
	const { setError, fetchData } = useQuery();

	const [page, setPage] = useState(1);

	const { key, tournamentSlug, eventSlug, validated } = useSelector(
		(state: AppState) => state.tournamentState
	);

	const { matchList, loading, error } = useSelector(
		(state: AppState) => state.tournamentState.matches
	);

	/**
	 * Fetches start.gg tournament match data.
	 *
	 * TODO: Sort match option
	 * @param page The page number of matches to fetch
	 * @returns The fetched matches if successful. Otherwise, returns any empty list.
	 */
	const fetchMatches = async (page: number = 1): Promise<Match[]> => {
		// Check if tournament was configured
		if (!key || !tournamentSlug || !eventSlug || !validated) {
			return [];
		}
		setPage(page);
		dispatch(setMatchesLoading(true));
		dispatch(setMatchesError(null));
		console.log('Fetching matches...');
		const matchData = await fetchData(key, matchesQuery(tournamentSlug, eventSlug, page, 12));
		if (!matchData || !matchData.data) {
			console.error('Failed to Fetch Matches', matchData);
			dispatch(setMatchesError('Failed To Fetch Matches'));
			dispatch(setMatchesLoading(false));
			return [];
		}
		let matches = matchData.data.tournament.events[0].sets.nodes;
		console.log(matches);
		if (!matches.length) {
			dispatch(setMatchesError('No New Matches'));
			dispatch(setMatchesLoading(false));
			return [];
		}
		// Filter out sets where both players have not yet advanced
		matches = matches.filter(
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(match: any) => match?.slots[0].entrant && match?.slots[1].entrant
		);

		// Parse matches
		matches = await Promise.all(
			matches
				.map(async (match: unknown) => await parseMatch(match))
				.filter((match: unknown) => match !== undefined)
		);
		dispatch(setMatchesLoading(false));
		return matches;
	};

	/**
	 * Fetches the first page of matches from start.gg and sets the match state.
	 */
	const refreshMatches = async () => {
		const matches = await fetchMatches();
		dispatch(setMatches(matches));
		return matches;
	};

	/**
	 * Fetches the next page of matches from start.gg and sets the match state.
	 */
	const getMoreMatches = async () => {
		const matches = await fetchMatches(page + 1);
		if (matches.length > 0) {
			setPage((prevPage) => {
				return prevPage + 1;
			});
			dispatch(addMatches(matches));
		}
		return matches;
	};

	return { matchList, loading, error, setError, fetchMatches, refreshMatches, getMoreMatches };
};

export default useMatch;
