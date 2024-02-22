import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../redux/reducers/rootReducer';
import useQuery from './useQuery';
import {
	setEntrantsError,
	setEntrantsLoading,
} from '../redux/actions/tournamentActions';
import eventEntrantsQuery from '../graphql/queries/eventEntrantsQuery';
import { parseEventEntrant } from '../utils/tournament';
import { Entrant } from '../interfaces/Types';

/**
 * Start.gg API Query hook.
 * Errors must be set manually.
 */
const useEntrants = () => {
	const dispatch = useDispatch();
	const { setError, fetchData } = useQuery();

	const { key, tournamentSlug, eventSlug, validated } = useSelector(
		(state: AppState) => state.tournamentState
	);

	const { entrantList, loading, error } = useSelector(
		(state: AppState) => state.tournamentState.entrants
	);

	/**
	 * Fetches start.gg tournament event entrant data.
	 * @param page The page number of entrants to fetch
	 * @returns The fetched entrants if successful. Otherwise, returns any empty list.
	 */
	const fetchEntrants = async (page: number = 1): Promise<Entrant[]> => {
		// Check if tournament was configured
		if (!key || !tournamentSlug || !eventSlug || !validated) {
			return [];
		}
		dispatch(setEntrantsLoading(true));
		dispatch(setEntrantsError(null));
		const entrantData = await fetchData(
			key,
			eventEntrantsQuery(tournamentSlug, eventSlug, page, 24)
		);
		if (!entrantData) {
			dispatch(setEntrantsError('Failed To Fetch Entrants'));
			dispatch(setEntrantsLoading(false));
			return [];
		}
		let entrants = entrantData.data.tournament.events[0].entrants.nodes;
		if (!entrants.length) {
			dispatch(setEntrantsError('No New Entrants'));
			dispatch(setEntrantsLoading(false));
			return [];
		}
		entrants = await Promise.all(
			entrants.map(async (entrant: any) => await parseEventEntrant(entrant))
		);
		dispatch(setEntrantsLoading(false));
		return entrants;
	};

	return { entrantList, loading, error, setError, fetchEntrants };
};

export default useEntrants;
