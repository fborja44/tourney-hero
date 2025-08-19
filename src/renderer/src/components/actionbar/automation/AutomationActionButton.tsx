import { useSelector } from 'react-redux';
import ActionButton, { ActionButtonProps } from '../ActionButton';
import { AppState } from '@renderer/redux/reducers/rootReducer';
import { BotSparkle20Regular } from '@fluentui/react-icons';
import AutomationMenu from './AutomationMenu';

const AutomationActionButton = () => {
	const { connected, activeGame, automate, autoUpdateScore, autoUpdateCharacters, invalidPorts } =
		useSelector((state: AppState) => state.slippiState);

	let color: ActionButtonProps['color'] = 'default';
	let label = 'Tasks Active';
	if (!connected || !automate || (!autoUpdateScore && !autoUpdateCharacters)) {
		label = 'Tasks Inactive';
	} else if (activeGame && activeGame.players.length > 2) {
		// Must be a singles match
		label = 'Too Many Players';
		color = 'warning';
	} else if (activeGame && invalidPorts.length > 0) {
		// Selected ports do not match active game ports
		label = `${invalidPorts.map((player) => `Port ${player.port}`).join(', ')} Invalid`;
		color = 'warning';
	} else if (activeGame) {
		label = 'Tasks Active';
		color = 'success';
	}

	return (
		<ActionButton
			icon={BotSparkle20Regular}
			title="Automation Status"
			menu={<AutomationMenu />}
			color={color}
		>
			{label}
		</ActionButton>
	);
};

export default AutomationActionButton;
