import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@redux/reducers/rootReducer';
import useStartQuery from './useStartQuery';
import {
	setEntrants,
	setEntrantsError,
	setEntrantsLoading
} from '@redux/actions/tournamentActions';
import eventEntrantsQuery from '@graphql/queries/eventEntrantsQuery';
import { parseEventEntrant } from '@utils/tournament';
import { Entrant } from '@common/interfaces/Types';
import { useEffect } from 'react';

/**
 * Start.gg API Query hook.
 * Errors must be set manually.
 */
const useEntrants = () => {
	const dispatch = useDispatch();
	const { setError, fetchData } = useStartQuery();

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
		// TODO: Get all entrants by fetching pages until empty
		const entrantData = await fetchData(
			key,
			eventEntrantsQuery(tournamentSlug, eventSlug, page, 128)
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
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			entrants.map(async (entrant: any) => await parseEventEntrant(entrant))
		);
		dispatch(setEntrantsLoading(false));
		return entrants;
	};

	useEffect(() => {
		if (validated) {
			const fetchEntrantData = async () => {
				const entrants = await fetchEntrants();
				dispatch(setEntrants(entrants));
			};
			fetchEntrantData();
		}
	}, [validated, eventSlug, tournamentSlug]);

	return { entrantList, loading, error, setError, fetchEntrants };
};

export default useEntrants;
