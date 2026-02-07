import ActionButton from '../ActionButton';
import { Clover20Regular } from '@fluentui/react-icons';
import AutomationMenu from './LuckyStatsMenu';

const LuckyStatsActionButton = () => {
	return (
		<ActionButton icon={Clover20Regular} title="Session Key Not Set" menu={<AutomationMenu />}>
			Lucky Stats
		</ActionButton>
	);
};

export default LuckyStatsActionButton;
