import { Button, Caption1, Spinner, makeStyles, shorthands } from '@fluentui/react-components';
import { TrophyOffRegular, ChevronDown20Regular } from '@fluentui/react-icons';
import { tokens } from '@fluentui/react-theme';
import { useSelector } from 'react-redux';
import { ACTIONBAR_HEIGHT, FOOTER_HEIGHT, SECTION_HEADER_HEIGHT } from '@common/constants/elements';
import TournamentCard from '../tournament/TournamentCard';
import Empty from '../../SidebarPlaceholder';
import { AppState } from '../../../../redux/reducers/rootReducer';
import useGlobalMatches from '../../../../hooks/useGlobalMatches';
import MatchCard from '../../../dashboard/match/MatchCard';
import { sortMatches } from '../../../../utils/tournament';
import MatchSearchBar from './MatchesSearchBar';
import { useEffect, useState } from 'react';
import useMatches from '@renderer/hooks/useMatches';
import Fuse from 'fuse.js';

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
	},
	spinner: {
		marginTop: tokens.spacingVerticalXXXL
	}
});

const MatchesMenu = () => {
	const classes = useStyles();

	const { tournament } = useSelector((state: AppState) => state.tournamentState);

	const { matchList, loading, error } = useSelector(
		(state: AppState) => state.tournamentState.globalMatches
	);

	const { entrantList } = useSelector((state: AppState) => state.tournamentState.entrants);

	const [searchTerm, setSearchTerm] = useState('');
	const [searchLoading, setSearchLoading] = useState(false);
	// const [stateFilters, setStateFilters] = useState([1, 2, 3]);

	const {
		matches: searchMatches,
		fetchMatches: fetchSearchMatches,
		clearMatches: clearSearchMatches
	} = useMatches();

	const { getMoreGlobalMatches, refreshGlobalMatches } = useGlobalMatches();

	/**
	 * Search for matches when the search term is changed
	 */
	useEffect(() => {
		// If no search term provided, skip
		if (searchTerm.trim().length === 0) {
			clearSearchMatches();
			setSearchLoading(false);
			return;
		}

		setSearchLoading(true);
		// eslint-disable-next-line prefer-const
		let timeout: NodeJS.Timeout | undefined;

		clearTimeout(timeout);

		timeout = setTimeout(async () => {
			// Find playerId whose tag matches the search
			const fuseOptions = {
				keys: ['tag']
			};
			const fuse = new Fuse(entrantList, fuseOptions);
			const result = fuse.search(searchTerm);
			const entrantIds = result.map((entry) => entry.item.id);

			await fetchSearchMatches(1, entrantIds);
			setSearchLoading(false);
		}, 1000);

		return () => clearTimeout(timeout);
	}, [searchTerm]);

	const sortedMatches = searchTerm.trim().length
		? sortMatches(searchMatches)
		: sortMatches(matchList);

	const MatchList = sortedMatches.length ? (
		sortedMatches.map((match) => (
			<MatchCard
				key={`${match.id}-${match.identifier}-item`}
				match={match}
				appearance="item"
			/>
		))
	) : (
		<Caption1 className={classes.empty}>No Matches Found</Caption1>
	);

	return (
		<div className={classes.container}>
			{tournament ? (
				<>
					<TournamentCard handleRefresh={refreshGlobalMatches} />
					<MatchSearchBar
						searchTerm={searchTerm}
						setSearchTerm={setSearchTerm}
						// stateFilters={stateFilters}
						// setStateFilters={setStateFilters}
					/>
					{!searchLoading ? (
						<div className={classes.matchList}>
							{MatchList}
							{sortedMatches.length > 0 && (
								<Button
									size="small"
									appearance="transparent"
									className={classes.moreButton}
									onClick={getMoreGlobalMatches}
									disabled={loading || error !== null || !sortedMatches.length}
								>
									{error ? (
										<Caption1 className={classes.empty}>{error}</Caption1>
									) : (
										!loading &&
										searchMatches.length === 0 && (
											<>
												<span>Load More Matches</span>
												<ChevronDown20Regular />
											</>
										)
									)}
								</Button>
							)}
						</div>
					) : (
						<Spinner size="small" className={classes.spinner} />
					)}
				</>
			) : (
				<Empty icon={<TrophyOffRegular />} caption={'Tournament Not Configured'} />
			)}
		</div>
	);
};

export default MatchesMenu;
