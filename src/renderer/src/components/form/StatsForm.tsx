import { Body1 } from '@fluentui/react-components';
import Panel from '../panel/Panel';
import formStyles from './styles/FormStyles';
import PlayerFormSection from './PlayerFormSection';
import { AppState } from '@renderer/redux/reducers/rootReducer';
import { useSelector } from 'react-redux';
import { updatedStatsPlayers } from '@renderer/redux/actions/dataActions';

const StatsForm = () => {
	const classes = formStyles();

	const { player1, player2 } = useSelector((state: AppState) => state.dataState.stats);

	return (
		<Panel>
			<PlayerFormSection player1={player1} player2={player2} updateFn={updatedStatsPlayers} />
		</Panel>
	);
};

export default StatsForm;
