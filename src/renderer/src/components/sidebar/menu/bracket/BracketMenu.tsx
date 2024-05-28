import { Button, useToastController } from '@fluentui/react-components';
import { TrophyOff20Regular } from '@fluentui/react-icons';
import { useDispatch, useSelector } from 'react-redux';
import { TournamentState } from '@redux/reducers/tournamentReducer';
import { useState } from 'react';
import Empty from '../../placeholder/SidebarPlaceholder';
import { AppState } from '@redux/reducers/rootReducer';
import useStartQuery from '@hooks/useStartQuery';
import top8Query from '@graphql/queries/top8Query';
import { parseMatch, parseTop8Sets } from '@utils/tournament';
import { updateBracket } from '@redux/actions/dataActions';
import MessageToast from '../../../toasts/MessageToast';
import { setTop8Matches } from '@renderer/redux/actions/tournamentActions';
import SidebarMenu from '../SidebarMenu';
import MatchCard from '@renderer/components/cards/match/MatchCard';

const BracketMenu = () => {
	const dispatch = useDispatch();
	const { dispatchToast } = useToastController('toaster');

	const { key, tournament, tournamentSlug, eventSlug, top8Matches }: TournamentState =
		useSelector((state: AppState) => state.tournamentState);
	const { matchList, loading, error } = top8Matches;

	const [searchTerm, setSearchTerm] = useState('');
	const [searchLoading, setSearchLoading] = useState(false);

	const { fetchData } = useStartQuery();

	/**
	 * Fetches top 8 bracket data for an event
	 */
	const handleFetchTop8 = async () => {
		if (!key || !tournament) {
			return;
		}
		const response = await fetchData(key, top8Query(tournamentSlug, eventSlug));
		if (!response || response.error) {
			dispatchToast(<MessageToast title="Failed To Get Top 8 Matches" />, {
				intent: 'error'
			});
			return [];
		}
		// Find sets in the data
		const phases = response.data.tournament.events[0].phases;
		if (!Array.isArray(phases)) {
			console.error('Invalid phases array');
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const phase = phases.filter((phase: any) => phase.name === 'Top 8');
		if (!phase.length) {
			dispatchToast(
				<MessageToast title="This tournament or event does not have a 'Top 8' phase." />,
				{
					intent: 'error'
				}
			);
			console.error("This tournament or event does not have a 'Top 8' phase.");
		}
		const nodes = phase[0].sets.nodes;
		const parsedData = parseTop8Sets(nodes);
		const top8Matches = await Promise.all(nodes.map((set) => parseMatch(set)));

		// TODO: Refactor
		dispatch(updateBracket(parsedData));
		dispatch(setTop8Matches(top8Matches));
		return parsedData;
	};

	return (
		<SidebarMenu
			placeholderIcon={<TrophyOff20Regular />}
			placeholderText="Tournament Not Configured"
			empty={!matchList.length}
			disabled={!tournament}
			searchTerm={searchTerm}
			setSearchTerm={setSearchTerm}
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
