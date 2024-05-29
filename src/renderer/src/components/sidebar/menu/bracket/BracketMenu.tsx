import { useToastController } from '@fluentui/react-components';
import { ArrowSync16Regular, TrophyOff20Regular } from '@fluentui/react-icons';
import { useDispatch, useSelector } from 'react-redux';
import { TournamentState } from '@redux/reducers/tournamentReducer';
import { AppState } from '@redux/reducers/rootReducer';
import useStartQuery from '@hooks/useStartQuery';
import phaseSetsQuery from '@graphql/queries/phaseSetsQuery';
import { parseMatch, parseTop8 } from '@utils/tournament';
import { updateBracket } from '@redux/actions/dataActions';
import MessageToast from '../../../toasts/MessageToast';
import { setTop8Matches } from '@renderer/redux/actions/tournamentActions';
import SidebarMenu from '../SidebarMenu';
import MatchCard from '@renderer/components/cards/match/MatchCard';

const TOP8_EVENT_NAME = 'Top 8';

const BracketMenu = () => {
	const dispatch = useDispatch();
	const { dispatchToast } = useToastController('toaster');

	const {
		key,
		tournament,
		tournamentSlug,
		eventSlug,
		top8Matches,
		selectedEvent
	}: TournamentState = useSelector((state: AppState) => state.tournamentState);
	const { matchList, loading, error } = top8Matches;

	const { fetchData } = useStartQuery();

	const top8Exists = selectedEvent?.phases.includes(TOP8_EVENT_NAME);

	/**
	 * Fetches top 8 bracket data for an event
	 */
	const handleFetchTop8 = async () => {
		if (!key || !tournament) {
			return;
		}
		const response = await fetchData(key, phaseSetsQuery(tournamentSlug, eventSlug));
		if (!response || response.error) {
			dispatchToast(<MessageToast title="Failed To Get Top 8 Matches" />, {
				intent: 'error'
			});
			return [];
		}
		// Find sets in the data
		console.log(response);
		const phases = response.data.tournament.events[0].phases;
		if (!Array.isArray(phases)) {
			console.error('Invalid phases array');
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const phase = phases.filter((phase: any) => phase.name === TOP8_EVENT_NAME);
		if (!phase.length) {
			dispatchToast(
				<MessageToast
					title={`This tournament or event does not have a ${TOP8_EVENT_NAME} phase.`}
				/>,
				{
					intent: 'error'
				}
			);
			console.error(`This tournament or event does not have a ${TOP8_EVENT_NAME} phase.`);
		}
		const nodes = phase[0].sets.nodes;
		const top8Matches = await Promise.all(nodes.map((set) => parseMatch(set)));
		const parsedData = parseTop8(top8Matches);

		dispatch(updateBracket(parsedData));
		dispatch(setTop8Matches(top8Matches));
		return parsedData;
	};

	return (
		<SidebarMenu
			placeholderIcon={<TrophyOff20Regular />}
			placeholderText={
				top8Exists ? 'Tournament Not Configured' : 'Event Does Not Have A Top 8 Phase'
			}
			empty={!matchList.length}
			loading={loading}
			disabled={!tournament || !top8Exists}
			error={error}
			actions={[
				{ label: 'Update Fields', onClick: handleFetchTop8 },
				{
					label: 'Auto-Sync',
					onClick: () => {},
					icon: <ArrowSync16Regular />,
					disabled: true
				}
			]}
		>
			{matchList.map((match) => (
				<MatchCard
					key={`${match.id}-${match.identifier}-item`}
					match={match}
					appearance="item"
				/>
			))}
		</SidebarMenu>
	);
};

export default BracketMenu;
