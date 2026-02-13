import ActionButton from '../ActionButton';
import { Clover20Regular } from '@fluentui/react-icons';
import AutomationMenu from './LuckyStatsMenu';
import { useSelector } from 'react-redux';
import { LuckyStatsState } from '@renderer/redux/reducers/luckyStatsReducer';
import { AppState } from '@renderer/redux/reducers/rootReducer';

const LuckyStatsActionButton = () => {
	const { isEnabled }: LuckyStatsState = useSelector((state: AppState) => state.luckyStatsState);

	return (
		<ActionButton
			icon={Clover20Regular}
			title={isEnabled ? 'Integration Enabled' : 'Integration Disabled'}
			menu={<AutomationMenu />}
		>
			Lucky Stats
		</ActionButton>
	);
};

export default LuckyStatsActionButton;
