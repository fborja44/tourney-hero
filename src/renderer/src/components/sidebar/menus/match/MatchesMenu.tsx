import { Button, Caption1, makeStyles, shorthands } from '@fluentui/react-components';
import { TrophyOffRegular, ChevronDown20Regular } from '@fluentui/react-icons';
import { tokens } from '@fluentui/react-theme';
import { useSelector } from 'react-redux';
import { TournamentState } from '../../../../redux/reducers/tournamentReducer';
import { ACTIONBAR_HEIGHT, FOOTER_HEIGHT, SECTION_HEADER_HEIGHT } from '@common/constants/elements';
import TournamentCard from '../tournament/TournamentCard';
import Empty from '../../SidebarPlaceholder';
import { AppState } from '../../../../redux/reducers/rootReducer';
import useMatch from '../../../../hooks/useEventMatches';
import MatchCard from '../../../dashboard/match/MatchCard';
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

	const { tournament }: TournamentState = useSelector((state: AppState) => state.tournamentState);

	const { matchList, loading, error, refreshMatches, getMoreMatches } = useMatch();

	const filteredMatches = sortMatches(matchList);

	const MatchList = filteredMatches.length ? (
		filteredMatches.map((match) => (
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
					<TournamentCard handleRefresh={refreshMatches} />
					<div className={classes.matchList}>
						{MatchList}
						{filteredMatches.length > 0 && (
							<Button
								size="small"
								appearance="transparent"
								className={classes.moreButton}
								onClick={getMoreMatches}
								disabled={loading || error !== null || !filteredMatches.length}
							>
								{error ? (
									<Caption1 className={classes.empty}>{error}</Caption1>
								) : (
									!loading && (
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
