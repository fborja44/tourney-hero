import Panel from '../panel/Panel';
import formStyles from './styles/FormStyles';
import PlayerFormSection from './PlayerFormSection';
import { AppState } from '@renderer/redux/reducers/rootReducer';
import { useSelector } from 'react-redux';
import { updatedStatsPlayers } from '@renderer/redux/actions/dataActions';
import { Body1, makeStyles, mergeClasses, tokens } from '@fluentui/react-components';
import EmptyPanel from '../panel/EmptyPanel';
import ReplayCard from '../cards/replay/ReplayCard';

const useStyles = makeStyles({
	listContainer: {
		display: 'flex',
		columnGap: tokens.spacingHorizontalXL
	}
});

const StatsForm = () => {
	const classes = useStyles();
	const formClasses = formStyles();

	const { player1, player2 } = useSelector((state: AppState) => state.dataState.statistics);
	const { selectedReplays, replayList } = useSelector((state: AppState) => state.replayState);

	return (
		<Panel>
			<div className={mergeClasses(formClasses.formSection, formClasses.borderBottom)}>
				<Body1 className={formClasses.sectionTitle}>Selected Replays</Body1>
				<div className={formClasses.spacing}>
					{selectedReplays.length > 0 ? (
						<div className={classes.listContainer}>
							{replayList
								.filter((replay) => selectedReplays.includes(replay.fileName))
								.map((replay) => {
									return (
										<ReplayCard
											key={`${replay.fileName}-card`}
											replay={replay}
											appearance="card"
										/>
									);
								})}
						</div>
					) : (
						<EmptyPanel text="No Replays Selected" hideIcon />
					)}
				</div>
			</div>
			<PlayerFormSection player1={player1} player2={player2} updateFn={updatedStatsPlayers} />
		</Panel>
	);
};

export default StatsForm;
