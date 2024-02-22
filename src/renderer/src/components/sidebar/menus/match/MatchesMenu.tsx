import { Button, Caption1, Spinner, makeStyles, shorthands } from '@fluentui/react-components';
import { TrophyOffRegular, ChevronDown20Regular } from '@fluentui/react-icons';
import { tokens } from '@fluentui/react-theme';
import { useDispatch, useSelector } from 'react-redux';
import { TournamentState } from '../../../../redux/reducers/tournamentReducer';
import { useEffect, useRef, useState } from 'react';
import {
	ACTIONBAR_HEIGHT,
	FOOTER_HEIGHT,
	SECTION_HEADER_HEIGHT
} from '../../../../constants/elements';
import TournamentCard from '../tournament/TournamentCard';
import Empty from '../../SidebarPlaceholder';
import { AppState } from '../../../../redux/reducers/rootReducer';
import useMatch from '../../../../hooks/useMatches';
import { addMatches, setMatches } from '../../../../redux/actions/tournamentActions';
import { MenuMatch } from '../../../dashboard/match/DashboardMatch';
import { sortMatches } from '../../../../utils/tournament';

const useStyles = makeStyles({
	container: {
		display: 'flex',
		flexDirection: 'column',
		height: '100%'
	},
	matchList: {
		display: 'flex',
		flexDirection: 'column',
		...shorthands.overflow('hidden', 'auto'),
		height: `calc(100vh - ${ACTIONBAR_HEIGHT} - ${SECTION_HEADER_HEIGHT} - ${FOOTER_HEIGHT})`
	},
	moreButton: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'center',
		height: 'fit-content',
		minHeight: '24px',
		...shorthands.gap(tokens.spacingHorizontalS),
		...shorthands.margin(tokens.spacingVerticalS, 0)
	},
	empty: {
		alignSelf: 'center',
		color: tokens.colorNeutralForeground2,
		...shorthands.margin(tokens.spacingVerticalL)
	}
});

// TODO: Selected Match
const MatchesMenu = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const { tournament }: TournamentState = useSelector((state: AppState) => state.tournamentState);

	const [refreshing, setRefreshing] = useState<boolean>(false);

	const { matchList, loading, error, fetchMatches } = useMatch();

	const pageLoaded = useRef<boolean>(false);

	const [page, setPage] = useState<number>(1);

	/**
	 * Fetches more matches using the next page of query results.
	 */
	const fetchMoreMatches = async () => {
		const newMatches = await fetchMatches(page + 1);
		setPage((prevPage) => {
			dispatch(addMatches(newMatches));
			return prevPage + 1;
		});
	};

	/**
	 * Refreshses the current list of matches, restarting at page 1.
	 */
	const refreshMatches = async () => {
		setRefreshing(true);
		const newMatches = await fetchMatches(1);
		dispatch(setMatches(newMatches));
		setPage(1);
		setRefreshing(false);
	};

	/**
	 * Load matches on page load.
	 * Reference used to prevent multiple calls in dev strict mode.
	 */
	useEffect(() => {
		if (!pageLoaded.current) {
			pageLoaded.current = true;
			fetchMatches(page);
		}
	}, []);

	/**
	 * Clear matches and fetch new matches if tournament is changed.
	 */
	useEffect(() => {
		const fetchNewMatches = async () => {
			if (!pageLoaded.current) {
				setRefreshing(true);
				const newMatches = await fetchMatches(1);
				setMatches(newMatches);
				setPage(1);
				pageLoaded.current = true;
				setRefreshing(false);
			}
		};
		fetchNewMatches();
	}, [tournament]);

	const filteredMatches = sortMatches(matchList.filter((match) => !match.completedAt));

	const MatchList = filteredMatches.length ? (
		filteredMatches.map((match) => (
			<MenuMatch key={`${match.id}-${match.identifier}-item`} match={match} />
		))
	) : (
		<Caption1 className={classes.empty}>No Matches In Queue</Caption1>
	);

	return (
		<div className={classes.container}>
			{tournament ? (
				<>
					<TournamentCard handleRefresh={refreshMatches} />
					<div className={classes.matchList}>
						{pageLoaded && !refreshing ? (
							MatchList
						) : (
							<Empty icon={<Spinner size={'extra-small'} />} />
						)}
						{filteredMatches.length > 0 && (
							<Button
								size="small"
								appearance="transparent"
								className={classes.moreButton}
								onClick={fetchMoreMatches}
								disabled={loading || error !== null || !filteredMatches.length}
							>
								{error ? (
									<Caption1 className={classes.empty}>{error}</Caption1>
								) : (
									pageLoaded &&
									!refreshing && (
										<>
											<span>Load More Matches</span>
											<ChevronDown20Regular />
										</>
									)
								)}
							</Button>
						)}
					</div>
				</>
			) : (
				<Empty icon={<TrophyOffRegular />} caption={'Tournament Not Configured'} />
			)}
		</div>
	);
};

export default MatchesMenu;
