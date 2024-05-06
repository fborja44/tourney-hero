import { Button, Caption1, makeStyles, shorthands } from '@fluentui/react-components';
import { TrophyOffRegular, ChevronDown20Regular } from '@fluentui/react-icons';
import { tokens } from '@fluentui/react-theme';
import { useSelector } from 'react-redux';
import { AppState } from '@redux/reducers/rootReducer';
import useGlobalMatches from '@hooks/useGlobalMatches';
import MatchCard from '../../../cards/match/MatchCard';
import { sortMatches } from '@utils/tournament';
import { useEffect, useState } from 'react';
import useMatches from '@renderer/hooks/useMatches';
import Fuse from 'fuse.js';
import SidebarMenu from '../SidebarMenu';

const useStyles = makeStyles({
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
	error: {
		alignSelf: 'center',
		color: tokens.colorNeutralForeground2,
		...shorthands.margin(tokens.spacingVerticalL)
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

	const { getMoreGlobalMatches } = useGlobalMatches();

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

	const MatchList = sortedMatches.map((match) => (
		<MatchCard key={`${match.id}-${match.identifier}-item`} match={match} appearance="item" />
	));

	return (
		<SidebarMenu
			searchTerm={searchTerm}
			setSearchTerm={setSearchTerm}
			loading={loading || searchLoading}
			placeholderIcon={<TrophyOffRegular />}
			placeholderText="Tournament Not Configured"
			empty={!sortedMatches.length}
			disabled={!tournament}
		>
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
						<Caption1 className={classes.error}>{error}</Caption1>
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
		</SidebarMenu>
	);
};

export default MatchesMenu;
