import { useSelector } from 'react-redux';
import { AppState } from '@redux/reducers/rootReducer';
import useStartQuery from './useStartQuery';
import eventEntrantDataQuery from '@renderer/graphql/queries/eventEntrantDataQuery';
import { parseEventEntrantPlayerData } from '@utils/tournament';
import { PlayerCardData } from '@common/interfaces/Data';

/**
 * Start.gg API Query hook.
 * Errors must be set manually.
 */
const useEntrant = () => {
	const { setError, fetchData } = useStartQuery();

	const { key, tournamentSlug, eventSlug, validated } = useSelector(
		(state: AppState) => state.tournamentState
	);

	const { entrantList, loading, error } = useSelector(
		(state: AppState) => state.tournamentState.entrants
	);

	/**
	 * Fetches start.gg tournament event entrant data for a single entrant.
	 * @param id The id of the entrant
	 * @returns The fetched entrant data if successful. Otherwise, returns null.
	 */
	const fetchEntrantData = async (entrantId: number): Promise<Partial<PlayerCardData> | null> => {
		// Check if tournament was configured
		if (!key || !tournamentSlug || !eventSlug || !validated) {
			return null;
		}
		// TODO: Get all entrants by fetching pages until empty
		const entrantData = await fetchData(key, eventEntrantDataQuery(entrantId));
		if (!entrantData) {
			return null;
		}
		let entrant = entrantData.data.entrant;
		console.log(entrant);
		if (!entrant) {
			return null;
		}
		entrant = await parseEventEntrantPlayerData(entrant);
		return entrant;
	};

	return { entrantList, loading, error, setError, fetchEntrantData };
};

export default useEntrant;
