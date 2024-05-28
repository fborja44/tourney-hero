import Panel from '../panel/Panel';
import formStyles from './styles/FormStyles';
import PlayerFormSection from './PlayerFormSection';
import { AppState } from '@renderer/redux/reducers/rootReducer';
import { useSelector } from 'react-redux';
import { updatedStatsPlayers } from '@renderer/redux/actions/dataActions';
import {
	Body1,
	Button,
	makeStyles,
	mergeClasses,
	shorthands,
	tokens
} from '@fluentui/react-components';
import EmptyPanel from '../panel/EmptyPanel';
import ReplayCard from '../cards/replay/ReplayCard';
import { Calculator20Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
	listContainer: {
		display: 'flex',
		columnGap: tokens.spacingHorizontalXL,
		rowGap: tokens.spacingHorizontalXL,
		flexWrap: 'wrap'
	},
	statsButton: {
		width: '100%',
		...shorthands.margin(tokens.spacingVerticalS, 0)
	}
});

const StatsForm = () => {
	const classes = useStyles();
	const formClasses = formStyles();
	const ipcRenderer = window.electron.ipcRenderer;

	const { player1, player2 } = useSelector((state: AppState) => state.dataState.statistics);
	const { selectedReplays, replayList, replayDir } = useSelector(
		(state: AppState) => state.replayState
	);

	const handleComputeStats = async () => {
		const stats = await ipcRenderer.invoke('slippi:getSetStats', replayDir, selectedReplays[0]);
		console.log(stats);
	};

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
				{selectedReplays.length > 0 && (
					<Button
						icon={<Calculator20Regular />}
						className={classes.statsButton}
						appearance="primary"
						onClick={() => handleComputeStats()}
					>
						Generate Stats
					</Button>
				)}
			</div>
			<PlayerFormSection player1={player1} player2={player2} updateFn={updatedStatsPlayers} />
		</Panel>
	);
};

export default StatsForm;
