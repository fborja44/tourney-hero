import PageHeader from '../pageheader/PageHeader';
import { Apps20Regular, TrophyOff20Regular } from '@fluentui/react-icons';
import Panel from '@renderer/components/panel/Panel';
import DashboardMatch from '@renderer/components/dashboard/match/DashboardMatch';
import { Body1 } from '@fluentui/react-components';
import { AppState } from '@renderer/redux/reducers/rootReducer';
import { TournamentState } from '@renderer/redux/reducers/tournamentReducer';
import { useSelector } from 'react-redux';
import EmptyPanel from '@renderer/components/panel/EmptyPanel';
import FormStyles from '@renderer/components/form/styles/FormStyles';
import { Match } from '@common/interfaces/Types';
import PageLayout from './PageLayout';
import dashboardStyles from '@renderer/components/dashboard/styles/DashboardStyles';

const DashboardPage = () => {
	const classes = dashboardStyles();
	const formStyles = FormStyles();

	const { tournament }: TournamentState = useSelector((state: AppState) => state.tournamentState);

	const { matchList, error } = useSelector((state: AppState) => state.tournamentState.matches);

	/**
	 * Renders a list of matches given a list of matches
	 * @param matches The matches to render
	 * @returns The rendered match list
	 */
	const createMatchList = (matches: Match[]) => {
		return matches.length ? (
			<div className={classes.listContainer}>
				{matches.map((match) => (
					<DashboardMatch key={`${match.id}-dashboard-item`} match={match} />
				))}
			</div>
		) : (
			<EmptyPanel text="No Matches Found" hideIcon />
		);
	};

	const completedMatches = createMatchList(matchList.filter((match) => match.state === 3));

	const inProgressMatches = createMatchList(matchList.filter((match) => match.state === 2));

	const waitingMatches = createMatchList(matchList.filter((match) => match.state === 1));

	return (
		<PageLayout header={<PageHeader title="Match Dashboard" icon={<Apps20Regular />} />}>
			<Panel>
				{tournament ? (
					error ? (
						<div className={classes.empty}>{error}</div>
					) : (
						<>
							<div className={formStyles.formSection}>
								<Body1 className={formStyles.sectionTitle}>Match Queue</Body1>
								{waitingMatches}
							</div>
							<div className={formStyles.formSection}>
								<Body1 className={formStyles.sectionTitle}>
									In Progress Matches
								</Body1>
								{inProgressMatches}
							</div>
							<div className={formStyles.formSection}>
								<Body1 className={formStyles.sectionTitle}>Completed Matches</Body1>
								{completedMatches}
							</div>
						</>
					)
				) : (
					<EmptyPanel text="Tournament Not Configured" icon={<TrophyOff20Regular />} />
				)}
			</Panel>
		</PageLayout>
	);
};

export default DashboardPage;
