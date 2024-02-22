import { Caption1, Switch, makeStyles, tokens } from '@fluentui/react-components';
import { TrophyOff20Regular } from '@fluentui/react-icons';
import { useDispatch, useSelector } from 'react-redux';
import { TournamentState } from '../../../../redux/reducers/tournamentReducer';
import TournamentCard from '../tournament/TournamentCard';
import Empty from '../../SidebarPlaceholder';
import { AppState } from '../../../../redux/reducers/rootReducer';
import { setAutoRefresh, setMatches } from '../../../../redux/actions/tournamentActions';
import useMatch from '../../../../hooks/useEventMatches';

const useStyles = makeStyles({
	container: {
		display: 'flex',
		flexDirection: 'column',
		height: '100%'
	},
	switch: {
		alignSelf: 'center',
		paddingTop: tokens.spacingVerticalS
	}
});

const DashboardMenu = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const { tournament, autoRefresh }: TournamentState = useSelector(
		(state: AppState) => state.tournamentState
	);

	const { fetchMatches } = useMatch();

	/**
	 * Refreshses the current list of matches, restarting at page 1.
	 */
	const refreshMatches = async () => {
		const newMatches = await fetchMatches();
		dispatch(setMatches(newMatches));
	};

	return (
		<div className={classes.container}>
			{tournament ? (
				<>
					<TournamentCard handleRefresh={refreshMatches} />
					<Switch
						label={<Caption1>Auto Refresh</Caption1>}
						className={classes.switch}
						checked={autoRefresh}
						onChange={(_ev, data) => {
							dispatch(setAutoRefresh(data.checked));
						}}
					/>
				</>
			) : (
				<Empty icon={<TrophyOff20Regular />} caption={'Tournament Not Configured'} />
			)}
		</div>
	);
};

export default DashboardMenu;
