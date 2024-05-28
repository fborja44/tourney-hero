import Panel from '../panel/Panel';
import formStyles from './styles/FormStyles';
import PlayerFormSection from './PlayerFormSection';
import { AppState } from '@renderer/redux/reducers/rootReducer';
import { useSelector } from 'react-redux';
import { updatedStatsPlayers } from '@renderer/redux/actions/dataActions';
import { Body1, mergeClasses } from '@fluentui/react-components';
import EmptyPanel from '../panel/EmptyPanel';

const StatsForm = () => {
	const classes = formStyles();

	const { player1, player2 } = useSelector((state: AppState) => state.dataState.statistics);

	return (
		<Panel>
			<div className={mergeClasses(classes.formSection, classes.borderBottom)}>
				<Body1 className={classes.sectionTitle}>Selected Replays</Body1>
				<div className={classes.spacing}>
					<EmptyPanel text="No Replays Selected" hideIcon />
				</div>
			</div>
			<PlayerFormSection player1={player1} player2={player2} updateFn={updatedStatsPlayers} />
		</Panel>
	);
};

export default StatsForm;
