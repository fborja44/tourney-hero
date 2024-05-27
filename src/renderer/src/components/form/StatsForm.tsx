import Panel from '../panel/Panel';
import PlayerFormSection from './PlayerFormSection';
import { AppState } from '@renderer/redux/reducers/rootReducer';
import { useSelector } from 'react-redux';
import { updatedStatsPlayers } from '@renderer/redux/actions/dataActions';

const StatsForm = () => {
	const { player1, player2 } = useSelector((state: AppState) => state.dataState.statistics);

	return (
		<Panel>
			<PlayerFormSection player1={player1} player2={player2} updateFn={updatedStatsPlayers} />
		</Panel>
	);
};

export default StatsForm;
