import { Button, makeStyles, tokens, useToastController } from '@fluentui/react-components';
import { TrophyOff20Regular } from '@fluentui/react-icons';
import { useDispatch, useSelector } from 'react-redux';
import { TournamentState } from '../../../../redux/reducers/tournamentReducer';
import { useState } from 'react';
import TournamentCard from '../tournament/TournamentCard';
import Empty from '../../SidebarPlaceholder';
import { AppState } from '../../../../redux/reducers/rootReducer';
import useQuery from '../../../../hooks/useStartQuery';
import top8Query from '../../../../graphql/queries/top8Query';
import { parseTop8Sets } from '../../../../utils/tournament';
import { updateBracket } from '../../../../redux/actions/dataActions';
import MessageToast from '../../../toasts/MessageToast';

const useStyles = makeStyles({
	container: {
		display: 'flex',
		flexDirection: 'column',
		height: '100%'
	},
	button: {
		marginTop: tokens.spacingVerticalM,
		width: 'fit-content',
		alignSelf: 'center'
	}
});

const BracketMenu = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { dispatchToast } = useToastController('toaster');

	const { key, tournament, tournamentSlug, eventSlug }: TournamentState = useSelector(
		(state: AppState) => state.tournamentState
	);

	const [refreshing, setRefreshing] = useState<boolean>(false);

	const { fetchData } = useQuery();

	/**
	 * Fetches top 8 bracket data for an event
	 */
	const fetchTop8 = async () => {
		if (!key || !tournament) {
			return;
		}
		setRefreshing(true);
		const { data } = await fetchData(key, top8Query(tournamentSlug, eventSlug));
		// Find sets in the data
		const phases = data.tournament.events[0].phases;
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
		} else {
			console.log(phase);
			const parsedData = parseTop8Sets(phase[0].sets.nodes);
			dispatch(updateBracket(parsedData));
		}
		setRefreshing(false);
	};

	return (
		<div className={classes.container}>
			{tournament ? (
				<>
					<TournamentCard handleRefresh={fetchTop8} />
					<Button
						onClick={fetchTop8}
						size="small"
						className={classes.button}
						appearance="primary"
						disabled={refreshing}
					>
						Fetch Top 8 Matches
					</Button>
				</>
			) : (
				<Empty icon={<TrophyOff20Regular />} caption={'Tournament Not Configured'} />
			)}
		</div>
	);
};

export default BracketMenu;
