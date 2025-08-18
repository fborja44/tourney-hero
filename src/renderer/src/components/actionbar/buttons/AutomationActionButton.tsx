import { useSelector } from 'react-redux';
import ActionButton from '../ActionButton';
import { AppState } from '@renderer/redux/reducers/rootReducer';
import { BotSparkle20Regular } from '@fluentui/react-icons';
import AutomationMenu from '../menus/AutomationMenu';

const AutomationActionButton = () => {
	const { connected, activeGame, automate, autoUpdateScore, autoUpdateCharacters, invalidPorts } =
		useSelector((state: AppState) => state.slippiState);

	let label = 'Actions Enabled';
	if (!connected) {
		label = 'Slippi Not Connected';
	} else if (!automate || (!autoUpdateScore && !autoUpdateCharacters)) {
		label = 'Actions Disabled';
	} else if (activeGame && activeGame.players.length > 2) {
		// Must be a singles match
		label = 'Too Many Players';
	} else if (activeGame && invalidPorts.length > 0) {
		// Selected ports do not match active game ports
		label = `${invalidPorts.map((player) => `Port ${player.port}`).join(', ')} Invalid`;
	}

	return (
		<ActionButton
			icon={BotSparkle20Regular}
			title="Automation Status"
			menu={<AutomationMenu />}
		>
			{label}
		</ActionButton>
	);
};

export default AutomationActionButton;
