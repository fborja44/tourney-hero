import ActionButton from '../ActionButton';
import { Clover20Regular } from '@fluentui/react-icons';
import AutomationMenu from './LuckyStatsMenu';
import { useSelector } from 'react-redux';
import { LuckyStatsState } from '@renderer/redux/reducers/luckyStatsReducer';
import { AppState } from '@renderer/redux/reducers/rootReducer';
import { GameplayData } from '@common/interfaces/Data';

const LuckyStatsActionButton = () => {
	const { isEnabled }: LuckyStatsState = useSelector((state: AppState) => state.luckyStatsState);
	const { player1, player2, matchup }: GameplayData = useSelector(
		(state: AppState) => state.dataState.gameplay
	);

	const matchupText = matchup ? `${player1.tag} vs ${player2.tag}` : 'No Matchup Data';

	return (
		<ActionButton
			icon={Clover20Regular}
			title={isEnabled ? matchupText : 'Integration Disabled'}
			menu={<AutomationMenu />}
		>
			Lucky Stats
		</ActionButton>
	);
};

export default LuckyStatsActionButton;
