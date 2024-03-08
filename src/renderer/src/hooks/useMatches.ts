import { useSelector } from 'react-redux';
import { AppState } from '../redux/reducers/rootReducer';
import setsQuery from '../graphql/queries/setsQuery';
import useQuery from './useQuery';
import { parseMatch } from '../utils/tournament';
import { Match } from '@common/interfaces/Types';
import { useState } from 'react';

/**
 * Hook to get matches from start.gg.
 * Errors must be set manually.
 */
const useSets = () => {
	const { error, setError, fetchData } = useQuery();

	const [page, setPage] = useState(1);
	const [filters, setFilters] = useState<number[]>([1, 2, 3]);

	const { key, tournamentSlug, eventSlug, validated } = useSelector(
		(state: AppState) => state.tournamentState
	);

	const [matches, setMatches] = useState<Match[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	/**
	 * Fetches start.gg tournament match data.
	 * TODO: Sort match option
	 * @param page The page number of matches to fetch
	 * @returns The fetched matches if successful. Otherwise, returns any empty list.
	 */
	const fetchMatches = async (
		page: number = 1,
		entrantIds: number[] = []
		// stateFilters: number[] = [1, 2, 3]
	): Promise<Match[]> => {
		// Check if tournament was configured
		if (!key || !tournamentSlug || !eventSlug || !validated) {
			return [];
		}
		setPage(page);
		setLoading(true);
		setError(null);
		console.log('Fetching matches...');
		const matchData = await fetchData(
			key,
			setsQuery(tournamentSlug, eventSlug, page, 16, entrantIds)
		);
		if (!matchData || !matchData.data) {
			console.error('Failed to Fetch Matches', matchData);
			setError('Failed To Fetch Matches');
			setLoading(false);
			return [];
		}
		let matches = matchData.data.tournament.events[0].sets.nodes;
		console.log(matches);
		if (!matches.length) {
			setError('No New Matches');
			setLoading(false);
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
		setLoading(false);
		setMatches(matches);
		return matches;
	};

	/**
	 * Fetches the first page of matches from start.gg and sets the match state.
	 */
	const refreshMatches = async () => {
		const matches = await fetchMatches();
		setMatches(matches);
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
			setMatches((prevMatches) => [...prevMatches, ...matches]);
		}
		return matches;
	};

	/**
	 * Clears match state
	 */
	const clearMatches = async () => {
		setMatches([]);
	};

	return {
		matches,
		loading,
		error,
		setError,
		filters,
		setFilters,
		fetchMatches,
		refreshMatches,
		getMoreMatches,
		clearMatches
	};
};

export default useSets;
